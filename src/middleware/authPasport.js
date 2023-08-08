export function authPassport(req, res, next) {
    console.log('authpassport', req.isAuthenticated())
    if (req.isAuthenticated()) {
        console.log('next')
        next()
    } else {
        console.log('login')

        res.status(300).redirect('login')
    }
}
export function authPassport2(req, res, next) {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.status(300).redirect('/')
    }
}
