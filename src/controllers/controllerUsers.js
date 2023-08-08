import { isValidPass, serviceUsers } from "../services/serviceUsers.js"

class ControllerUsers {
    async controllerRegister (req, res, next){
        try {
            console.log(req.body)
            console.log(req.session)
            console.log(req.user)
            res.status(300).redirect('/login')           
        } catch (error) {
            next(error)
        }
    }
    async controllerLogin (req, res, next){
        try {
            req.session.user = {
                name: isExist.firstName+' '+isExist.lastName,
                email: isExist.email,
                role:isExist.role
            }
            res.status(200).redirect('/home')           
        } catch (error) {
            next(error)
        }
    }
}

export const controllerUsers = new ControllerUsers()