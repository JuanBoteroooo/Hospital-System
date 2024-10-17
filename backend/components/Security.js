const Security = class {
  constructor() {
    this.permission = new Map();
    this.loadPermission();
  }

  loadPermission() {
    db.exe('',[])
    .then((r) => {
      r.rows.forEach((element) => {
        let key =
          element.profile_id +
          "_" +
          element.method_na +
          "_" +
          element.object_de;
        this.permission.set(key, true);
      });
    });
  }

  getPermission(jsonData) {
    let key =
      jsonData.userProfile +
      "_" +
      jsonData.methodName +
      "_" +
      jsonData.objectName;
    if (this.permission.has(key)) return this.permission.get(key);
    else return false;
  }

  executeMethod(jsonData) {
    let c = require(`./BO/${jsonData.objectName}.js`);
    let i = new c();
    i[`${jsonData.methodName}`](jsonData.params);
  }
};
module.exports = Security;
