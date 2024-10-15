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

  autenticar(req) {}

  sessionExist(req) {
    if (req.session) {
      if (req.session.userId) {
        return true;
      } else return false;
    } else return false;
  }

  createSession(req, res) {
    db("security","getUser",[req.body.username, req.body.password])
    .then((r) => {
      if (r.rows.length > 0) {
        req.session.userId = r.rows[0].user_id;
        req.session.userName = r.rows[0].user_na;
        req.session.userProfile = r.rows[0].profile_id;
        res.send("sesion creada..!");
      } else {
        res.send("Datos invalidos, no se puede hacer login..!");
      }
    });
  }
};

module.exports = Session;
