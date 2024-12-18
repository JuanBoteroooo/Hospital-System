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
global.security = new (require("../backend/components/Security.js"))();
global.log = new (require('../backend/components/Log.js'))()
//******************************************************************************

//******************************** ENDPOINT ************************************
// LOGIN
app.post('/login', async function (req, res) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).send(`{"msg": "Datos inválidos."}`);
  }

  try {
    if (sess.sessionExist(req)) {
      return res.status(400).send(`{"msg": "Ya tiene sesión."}`);
    }

    // Aquí llamamos al método createSession de la clase Session
    await sess.createSession(req, res);

  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).send(`{"msg": "Error del servidor."}`);
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
      return res.status(500).send(`{"msg": "Error del servidor..!"}`);
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
  console.log('Request body:', req.body);
  console.log("Sesión actual en /toProcess:", req.session);

  if (!sess.sessionExist(req)) {
    return res.status(401).send({ msg: "Debe iniciar sesión." });
  }

  const jsonData = {
    userProfile: req.session.profileId,  // Esto debería estar en la sesión
    methodName: req.body.methodName,
    objectName: req.body.objectName,
    params: req.body.params
  };

  console.log("jsonData:", jsonData);  // Verifica si el perfil y los otros datos son correctos

  if (security.getPermission(jsonData)) {
    const result = security.executeMethod(jsonData, res); 
    console.log("Resultado de la ejecución del método:", result);
  } else {
    return res.status(403).send({ msg: "No tiene permiso." });
  }
});

app.get('/sessionExist', (req, res) => {
  if (sess.sessionExist(req)) {
    res.send({ session: true });
  } else {
    res.send({ session: false });
  }
});

//********************************************************************************

// SERVIDOR
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});