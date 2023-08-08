import passport from "passport";
import { Strategy as StrategyGithub } from "passport-github2";
import { isValidPass, serviceUsers } from "../services/serviceUsers.js";

//!    CREDENCIALES PROPIAS DE GITHUB (ME DA ERROR DE PERMISOS)
// const strategyOptions = {
//     clientID: 'Iv1.3ed8e1a0ec00a25e',
//     clientSecret: 'f606483544c17d5867086a97d9aec2d75fb29ec3 ',
//     callbackURL: "http://127.0.0.1:8080/homeGithub"
// }
//*CREDENCIALES DE GITHUB DE MAURICIO (USE LAS DEL PROFE Y ANDA PERFECTO)
const strategyOptions = {
    clientID: 'Iv1.77a8c28d24f7855d',
    clientSecret: 'fa1a31b0fe0e7e7931bf1562bc2bf55219633d68',
    callbackURL: 'http://localhost:8080/users/profile-github'
}

async function loginGithub(accessToken, refreshToken, profile, done) {
    const user = await serviceUsers.serviceGetByEmail(profile._json.email)
    if (user) {
        return done(null, user)
    }
    let name = profile._json.name.split(' ')
    let [lastName] = name.splice(name.length - 1)
    let userGithub = {
        email: profile._json.email,
        firstName: name.join(' '),
        lastName, 
        isGithub: true,
        password: ''
    }
    const newUser = await serviceUsers.serviceAddUser(userGithub)
    return done(null, newUser)
}

passport.use('github', new StrategyGithub(strategyOptions, loginGithub))
