// LIBRERIAS
var express = require('express')
var app = express();

//********************** IMPORTACION DE LOS QUERYS ***********************

const querys = require('../backend/data/querys.json');
const models = new (require('../backend/models/userModels.js'))();

//********************** CONFIGURACIONES DEL APP ***********************

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
global.security = new (require("../backend/components/Security.js"))();
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
  if (!username || !password) {
    res.send(`{"msg": "datos invalidos..!"}`);
  }
  else{
    if(!sess.sessionExist(req)){
      await sess.createSession({req, user: {username, password}});
    }else{
      res.status(400).send(`{"msg": "ya tiene session..!"}`);
    }
  }
});

app.post('/register', async function (req, res) {
  const { username, password, email } = req.body;
  let user = await db.exe('getUser',[username]);
  if(user){
    res.send(`{"msg": "usuario ya existe..!"}`);
  }
  else{
    await db.exe('registerUser',[username, password, email]);
    if(res>0){
      res.send(`{"msg": "usuario registrado..!"}`);
    }else{
      res.send(`{"msg": "error al registrar..!"}`); 
    }
  }
});

app.post('/hasSession', function (req, res) {

  if(sess.sessionExist(req)){
    res.send(`{"msg": "tiene session..!"}`);
  }else{
    res.send(`{"msg": "no tiene session..!"}`);
  }
});

// LOGOUT
app.post('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout ok!");
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