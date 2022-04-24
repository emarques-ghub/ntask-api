const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt
const {Strategy} = require('passport-jwt');

module.exports = app => {
    const Users = app.db.models.Users;
    const cfg = app.libs.config;
    const strategy = new Strategy({secretOrKey: cfg.jwtSecret, jwtFromRequest: ExtractJwt.fromHeader('authorization')},
        (payload, done) =>{
            Users.finfByPk(payload.id)
                .then(user => {
                    if(user) {
                        return done(null, {
                            id: user.id,
                            email: user.email
                        });
                    }
                    return done(null, false);
                })
                .catch(error => done(error, null));
        });
    passport.use(strategy);
 
    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate("jwt", cfg.jwtSession),
    };
};