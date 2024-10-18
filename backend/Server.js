// LIBRERIAS
var express = require('express')
var cors = require('cors')
var app = express();
const port = 3000;

//********************** IMPORTACION DE LOS QUERYS ***********************
const cors_config = require('../backend/config/cors.json');
const querys = require('../backend/data/querys.json');

//********************** CONFIGURACIONES DEL APP ***********************
app.use(cors(cors_config));
app.use(express.static("public"));
app.use("/static", express.static("public"));
// PARA EL PARSER CON application/json
app.use(express.json());
// PARA EL PARSER CON application/xwww-
app.use(express.urlencoded({ extended: false })); //body formulario
//***********************************************************************

//************************** inicio de sub sistemas ****************************
global.sess = new (require("../backend/components/Session.js"))(app);
global.db = new (require("../backend/components/Db.js"))(querys);
// global.security = new (require("../backend/components/Security.js"))();
global.log = new (require('../backend/components/Log.js'))()
//******************************************************************************

//******************************** ENDPOINT ************************************
// LOGIN
app.post('/login', async function (req, res) {
  const { username, password } = req.body;
  
  if (!username || !password) {
      return res.status(400).send(`{"msg": "datos invalidos..!"}`);
  }

  try {
      if (sess.sessionExist(req)) {
          return res.status(400).send(`{"msg": "ya tiene sesión..!"}`);
      }

      const result = await db.exe('getUser', [username, password]);
      if (result.rows.length > 0) {
          req.session.userId = result.rows[0].user_id;
          req.session.username = result.rows[0].username;
          return res.status(200).send(`{"msg": "sesión creada..!"}`);
      } else {
          return res.status(401).send(`{"msg": "usuario no encontrado o contraseña incorrecta..!"}`);
      }
  } catch (error) {
      console.error('Login error:', error);
      return res.status(500).send(`{"msg": "Internal server error..!"}`);
  }
});


app.post('/register', async function (req, res) {
  const { username, password, name, lastName, phone, email, address } = req.body;
  if (!username || !password || !name || !lastName || !phone || !email || !address) {
    console.log("datos invalidos..!");
    return res.status(400).send(`{"msg": "datos invalidos..!"}`);
  }

  try {
      const existsResult = await db.exe('checkUserExists', [username]);
      if (existsResult.rows.length > 0) {
          console.log("usuario ya existente..!");
          return res.status(409).send(`{"msg": "usuario ya existente..!"}`);
      }

      const personResult = await db.exe('registerData', [name, lastName, phone, email, address]);
      if (personResult.rows.length > 0) {
          const personId = personResult.rows[0].person_id; 

          const userResult = await db.exe('registerUser', [username, password, personId]);
          if (userResult.rows.length > 0) {
              console.log("usuario registrado con éxito..!");
              return res.send(`{"msg": "usuario registrado con éxito..!"}`);
          } else {
              console.log("no se pudo registrar el usuario..!");
              return res.status(400).send(`{"msg": "no se pudo registrar el usuario..!"}`);
          }
      } else {
          console.log("no se pudo registrar los datos personales..!");
          return res.status(400).send(`{"msg": "no se pudo registrar los datos personales..!"}`);
      }
  } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).send(`{"msg": "Internal server error..!"}`);
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
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});