const route = require('express').Router()
const imageCtrl = require('../controller/imageCtrl')

route.post(`/product/upload`, imageCtrl.uploadProduct)
route.post(`/product/destroy`, imageCtrl.deleteProduct);
route.post(`/profile/upload`, imageCtrl.uploadProfileImg);
route.post(`/profile/destroy`, imageCtrl.deleteProfileImg);

module.exports = route
