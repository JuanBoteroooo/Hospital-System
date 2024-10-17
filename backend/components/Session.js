const Session = class {
  constructor(app) {
    this.session = require("express-session");
    app.use(
      this.session({
        secret: "qwertypoiuy123_flex",
        resave: false,
        saveUninitialized: true,
        duration: 1800000,
        activeDuration: 900000,
        cookie: {
          expires: 1800000,
          secure: true,
          sameSite: 'strict',
          httpOnly: true,
        },
      })
    );
  }

  // autenticar(req) {}

  sessionExist(req) {
    if (req.session) {
      if (req.session.userId) {
        return true;
      } else return false;
    } else return false;
  }

  async createSession({req, user}){
    try{       
        const {session} = req;
        console.log(user)
        for(let key in user){
            session[key] = user[key];
            console.log(`creare sesion con ${session[key]}`);
        }
        return new Promise((resolve, reject) => {
            session.save(err => {
                if(err) {
                    console.error('Error al guardar la sesión:', err);
                    reject(err);
                } else {
                    console.log('Sesión guardada con éxito');
                    resolve();
                }
            });
        });
        }catch(error){
            console.log(error)
            return {error}
        }
}
};

module.exports = Session;