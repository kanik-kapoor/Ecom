const express = require('express')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');
const { newOrder, getSingleOrderDetail, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController.js')
const router = express.Router()


router.route('/order/new').post(isAuthenticatedUser,newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetail)
router.route('/orders/me').get(isAuthenticatedUser,myOrders)
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders)
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
router.route('/admin/order/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)
module.exports = router