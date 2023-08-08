import {Router} from 'express'
import { controllerViews } from '../controllers/controllerViews.js'
import { authPassport2, authPassport } from '../middleware/authPasport.js'
import passport from 'passport'

export const routerViews = Router()

routerViews.get('/', controllerViews.controllerIndex) 
routerViews.get('/users/profile-github', passport.authenticate(`github`, { scope: ['user:email'] }), controllerViews.controllerHome)

routerViews.get('/home', authPassport, controllerViews.controllerHome) 
routerViews.get('/realtimeproducts', authPassport, controllerViews.controllerRealtimeproducts) 
routerViews.get('/products',authPassport, controllerViews.controllerProducts) 
routerViews.get('/carts/:cid', authPassport, controllerViews.controllerViewCart) 

routerViews.get('/errorRegister', controllerViews.controllerViewsErrorRegister) 
routerViews.get('/errorLogin', controllerViews.controllerViewsErrorLogin) 
routerViews.get('/logout', controllerViews.controllerLogout) 
routerViews.get('/register', authPassport2, controllerViews.controllerViewsRegister)
routerViews.get('/login', authPassport2, controllerViews.controllerViewsLogin) 
