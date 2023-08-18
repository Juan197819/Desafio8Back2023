import passport from "passport";
import { Strategy as StrategyLocal } from "passport-local";
import { isValidPass, serviceUsers } from "../services/serviceUsers.js";

const strategyOptions = {
    usernameField: 'email',
    passReqToCallback: true
}
async function login(req, email, password, done) {
    try {
        const user = await serviceUsers.serviceGetByEmail(email)
        if (!user) {
            return done(null, false)
        }  
        if (!isValidPass(password, user.password)) {
            return done(null, false)
        }
        return done(null,user)    
    } catch (error) {
        throw error
    }
}
async function register(req, email, password, done) {
    try {
        const user = await serviceUsers.serviceGetByEmail(email)
        if (user) {
            return done(null, false)
        }  
        console.log('user',user)
        console.log('req.body',req.body)
        const newUser = await serviceUsers.serviceAddUser(req.body)
        return done(null, newUser)    
    } catch (error) {
        throw error
    }
}

passport.use('login', new StrategyLocal(strategyOptions, login))
passport.use('register', new StrategyLocal(strategyOptions, register))

passport.serializeUser((user, done) => {
    console.log('Serialize', user)
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    console.log('deserialize', id)
    const user = await serviceUsers.serviceGetById(id);
    return done(null, user);
});