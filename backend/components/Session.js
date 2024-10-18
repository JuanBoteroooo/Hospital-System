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

  async createSession(req, res){
    try {
        const result = await db.exe('getUser', [req.body.username, req.body.password]);
        if (result && result.rows.length > 0) {
            console.log('User found:', result.rows[0]);
            req.session.userId = result.rows[0].id_user;
            req.session.username = result.rows[0].username;
            res.send(`{"msg": "session creada..!"}`);
        } else {
            res.status(400).send(`{"msg": "usuario no encontrado..!"}`);
        }
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).send(`{"msg": "Internal server error..!"}`);
    }
}
};

module.exports = Session;