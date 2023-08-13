const express = require('express');
const {
    createUser, 
    loginUser,
    login, 
    logoutUser,
    forgetPassword, 
    resetPassword, 
    getUserDetail, 
    updateUserPassword, 
    updateUserpPofile, 
    getAllUsers, 
    getSingleUserDetail,
    updateUserbyAdmin,
    deleteUserByAdmin,
    register,
    admin
} = require('../controllers/userController.js')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');
const  router = express.Router();

router.route('/register').post(createUser)
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route("/password/forgot").post(forgetPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route('/me').get(isAuthenticatedUser ,getUserDetail)
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword)
router.route("/me/update").put(isAuthenticatedUser, updateUserpPofile)
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUserDetail)
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateUserbyAdmin)
router.route("/admin/user/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUserByAdmin)

router.get('/login',(req,res) =>{
    login(req,res)
})

router.get('/register',(req,res) =>{
    register(req,res)
})

router.get('/admin',(req,res) =>{
    admin(req,res)
})

module.exports = router