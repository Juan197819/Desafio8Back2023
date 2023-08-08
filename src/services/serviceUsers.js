import 'dotenv/config'
import bcrypt from 'bcrypt'
const PERSISTENCIA = process.env.PERSISTENCIA //FileSystem o MongoDB (BD actual MongoDB en archivo .env)
const {default: daoUsers} = await import(`../daos/${PERSISTENCIA}/daoUsers.js`)

function createHash(pass) {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(5))
}
export function isValidPass(pass, hash) {   
    console.log(pass)
    console.log(hash)
    return bcrypt.compareSync(pass, hash)
}

class ServiceUsers {
    async serviceAddUser (user){
        try {
            if (user.email == 'adminCoder@coder.com' && user.password == 'adminCod3r123') user.role = 'admin'

            const objUser = {
                ...user,
                password: createHash(user.password)
            }
            const newUser = await daoUsers.addUser(objUser)
            return newUser
        } catch (error) {
            throw error
        }
    }
    async serviceGetByEmail (email){
        try {
            const [isExist] = await daoUsers.getUserByEmail(email)
            return isExist
        } catch (error) {
            throw error
        }
    }
    async serviceGetById(id){
        try {
            return await daoUsers.getUserById(id)
        } catch (error) {
            throw error
        }
    }
}
export const serviceUsers = new ServiceUsers()