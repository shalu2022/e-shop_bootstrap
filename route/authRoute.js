const route = require('express').Router()
const authController = require('../controller/authController')
// const authMiddleware = require('../middleware/auth')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/AdminAuth')

route.post(`/register`, authController.register)
route.post(`/login`, authController.login)
route.get(`/logout`, authController.logout)
route.get(`/refreshToken`, authController.refreshToken)
route.patch(`/resetPassword`, authController.resetPassword)

route.get(`/userinfo`,auth, authController.getUserInfo)
route.patch(`/addToCart`, auth, authController.addToCart  )
route.get(`/orders`, auth, authController.getOrders)

route.get(`/allUsers`, auth, adminAuth, authController.getAllUsers)


module.exports = route;