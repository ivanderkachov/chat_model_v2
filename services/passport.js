//  eslint-disable-next-line import/no-import-module-exports
// import User from "../model/User.model";
const User = require("../model/User.model");
const passportJWT = require('passport-jwt')

const cookieExtractor = (req) => {
  return req && req.cookies && req.cookies.token
}

const jwtOptions = {
  secretOrKey: "howareyou",
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor])
};

const jwtStrategy = new passportJWT.Strategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.uid, (err, user) => {
    if (err) {
      return done(err, null)
    }
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  })
})

exports.jwt = jwtStrategy