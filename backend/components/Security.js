const Security = class {
  constructor() {
    this.permission = new Map();
    this.loadAllPermissions(); // Cargar todos los permisos al iniciar el servidor
    console.log("Permisos cargados:", this.permission);
  }

  // Cargar todos los permisos para todos los perfiles
  loadAllPermissions() {
    db.exe('getAllPermissions')  // Nueva consulta para cargar todos los permisos
      .then((r) => {
        if (r.rows.length === 0) {
          console.log('No se encontraron permisos.');
        }
        r.rows.forEach((element) => {
          let key = element.profile_id + "_" + element.method_na + "_" + element.object_na;
          console.log("Cargando permiso para la clave:", key); 
          this.permission.set(key, true); // Almacenar el permiso en el Map
        });
      })
      .catch((error) => {
        console.error('Error cargando permisos:', error);
      });
  }

  // Verificar si el perfil tiene el permiso para el objeto/método
  getPermission(jsonData) {
    let key =
      jsonData.userProfile +
      "_" +
      jsonData.methodName +
      "_" +
      jsonData.objectName;
    console.log("Checking permission for key:", key);
    if (this.permission.has(key)) return this.permission.get(key);
    else return false;
  }

  // Ejecutar el método en el BO correspondiente
  executeMethod(jsonData, res) {
    try {
      console.log(`Intentando cargar el BO: ${jsonData.objectName}.js, método: ${jsonData.methodName}`);
  
      const BOClass = require(`../BO/${jsonData.objectName}.js`); 
      const boInstance = new BOClass(this.db);
      
      if (typeof boInstance[jsonData.methodName] === 'function') {
        return boInstance[jsonData.methodName](jsonData.params);
      } else {
        throw new Error(`Método '${jsonData.methodName}' no encontrado en el BO '${jsonData.objectName}'`);
      }
  
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        console.error(`Error: El BO '${jsonData.objectName}.js' no existe.`);
        res.status(404).send({ msg: `El BO '${jsonData.objectName}' no existe.` });
      } else {
        console.error('Error ejecutando el método en el BO:', error);
        res.status(500).send({ msg: `Error ejecutando el método '${jsonData.methodName}' en el BO '${jsonData.objectName}'` });
      }
      throw error;
    }
  }
};

module.exports = Security;
