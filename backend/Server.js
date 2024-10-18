// LIBRERIAS
var express = require('express')
var cors = require('cors')
var app = express();

//********************** IMPORTACION DE LOS QUERYS ***********************
const cors_config = require('../backend/config/cors.json');
const querys = require('../backend/data/querys.json');
const models = new (require('../backend/models/userModels.js'))();

//********************** CONFIGURACIONES DEL APP ***********************
app.use(cors(cors_config));
app.use(express.static("public"));
app.use("/static", express.static("public"));
// PARA EL PARSER CON application/json
app.use(express.json());
// PARA EL PARSER CON application/xwww-
app.use(express.urlencoded({ extended: false })); //body formulario
app.get("/login", inicio);
//***********************************************************************

//************************** inicio de sub sistemas ****************************
global.sess = new (require("../backend/components/Session.js"))(app);
global.db = new (require("../backend/components/Db.js"))(querys);
// global.security = new (require("../backend/components/Security.js"))();
global.log = new (require('../backend/components/Log.js'))()
//******************************************************************************

// FUNCION PARA ENVIO DEL HTML
function inicio (req, res){
  res.sendFile(__dirname + "/Sesion.html");
}

//******************************** ENDPOINT ************************************
// LOGIN
app.post('/login', async function (req, res) {
  const { username, password } = req.body;
  
  // Verificar que los campos necesarios estén presentes
  if (!username || !password) {
      return res.status(400).send(`{"msg": "datos invalidos..!"}`);
  }

  try {
      // Verificar si ya existe una sesión
      if (sess.sessionExist(req)) {
          return res.status(400).send(`{"msg": "ya tiene sesión..!"}`);
      }

      // Verificar credenciales del usuario
      const result = await db.exe('getUser', [username, password]);
      if (result.rows.length > 0) {
          // Crear sesión si las credenciales son correctas
          req.session.userId = result.rows[0].user_id;
          req.session.username = result.rows[0].username;
          return res.send(`{"msg": "sesión creada..!"}`);
      } else {
          return res.status(401).send(`{"msg": "usuario no encontrado o contraseña incorrecta..!"}`);
      }
  } catch (error) {
      console.error('Login error:', error);
      return res.status(500).send(`{"msg": "Internal server error..!"}`);
  }
});


app.post('/register', async function (req, res) {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
      return res.status(400).send(`{"msg": "datos invalidos..!"}`);
  }

  try {
      // Primero, verifica si el usuario ya existe
      const userExists = await db.exe('checkUserExists', [username]);
      if (userExists.rows.length > 0) {
          return res.status(409).send(`{"msg": "usuario ya registrado..!"}`);
      }

      // Si no existe, registra al nuevo usuario
      const newUser = await db.exe('registerUser', [username, password, email]);
      if (newUser.rows.length > 0) {
          return res.send(`{"msg": "usuario registrado..!"}`);
      } else {
          return res.status(400).send(`{"msg": "no se pudo registrar el usuario..!"}`);
      }
  } catch (error) {
      console.error('Registration error:', error);
      res.status(500).send(`{"msg": "Internal server error..!"}`);
  }
});


// LOGOUT
app.post('/logout', function (req, res) {
  if (sess.sessionExist(req)) {
      req.session.destroy(err => {
          if (err) {
              console.log("Error al cerrar sesión", err);
              res.status(500).send(`{"msg": "Error al cerrar sesión."}`);
          } else {
              res.send(`{"msg": "Sesión cerrada correctamente."}`);
          }
      });
  } else {
      res.send(`{"msg": "No tiene sesión activa."}`);
  }
});

// toProcess
app.post('/toProcess', function (req, res) { 
  if(sess.sessionExist(req)===false){
    res.send(`{"msg": "debe hacer session..!"}`);
  }
  else{
    if(security.getPermission({
      userProfile : req.session.userProfile,
      objectName : req.body.objectName,
      methodName : req.body.methodName,
    })){
      security.executeMethod(req.body);
      res.send(`{"msg": "metodo ejecutado..!"}`);
    }
    else{
      res.send(`{"msg": "No tiene permiso..!"}`);
    }
  }
});
//********************************************************************************

// SERVIDOR
app.listen(3000);
console.log("Servidor activo en http://localhost:3000");