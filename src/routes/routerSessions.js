import { Router } from 'express'
import passport from 'passport'
export const routerSessions = Router()

routerSessions.post('/register', passport.authenticate(`register`, { failureRedirect: '/errorRegister', successRedirect: '/home' }))
routerSessions.post('/login', passport.authenticate(`login`, { failureRedirect: '/errorLogin',successRedirect: '/home' })) 
routerSessions.get('/loginGithub', passport.authenticate(`github`, {scope: ['user:email']})) 
//? routerSessions.get('/homeGithub', passport.authenticate(`github`, { scope: ['user:email'], failureRedirect: '/errorRegister', successRedirect: '/homeGithub' })) 
