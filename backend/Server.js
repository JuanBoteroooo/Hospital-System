// LIBRERIAS
var express = require('express')
var app = express();

//********************** CONFIGURACIONES DEL APP ***********************

app.use(express.static("public"));
app.use("/static", express.static("public"));
// PARA EL PARSER CON application/json
app.use(express.json());
// PARA EL PARSER CON application/xwww-
app.use(express.urlencoded({ extended: false })); //body formulario
app.get("/", inicio);
//***********************************************************************

//************************** inicio de sub sistemas ****************************
global.sess = new (require("./Session.js"))(app);
global.db = new (require("./Db.js"))();
global.security = new (require("./Security.js"))();
global.log = new (require('./Log.js'))()
//******************************************************************************

// FUNCION PARA ENVIO DEL HTML
function inicio (req, res){
  res.sendFile(__dirname + "/Sesion.html");
}

//******************************** ENDPOINT ************************************
// LOGIN
app.post('/login', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.send('datos invalidos..!');    
    } 
    else {     
        if(!sess.sessionExist(req)) sess.createSession(req,res);
        else res.send('La sesion ya existe..!');    
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