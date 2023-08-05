const express= require('express')
const { getAllProducts, createProduct, updateProducts, deleteProducts, productDetail,createProuctReview, getAllreviewsSingleProduct, deleteReviews, newProduct, deleteProduct } =  require('../controllers/productControllers.js');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');
const router = express.Router()


router.route('/products').get(getAllProducts);
router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);
router.route('/admin/products/:id').put(isAuthenticatedUser,authorizeRoles("admin"), updateProducts);
router.route('/admin/products/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProducts);
router.route('/products/:id').get(productDetail);
router.route('/review').put(isAuthenticatedUser, createProuctReview)
router.route('/reviews').get(getAllreviewsSingleProduct).delete(isAuthenticatedUser,deleteReviews)

router.get('/admin/products/new',isAuthenticatedUser,authorizeRoles("admin"),(req,res) =>{
    newProduct(req,res)
})

router.get('/admin/products/delete',isAuthenticatedUser,authorizeRoles("admin"),(req,res) =>{
    deleteProduct(req,res)
})



module.exports = router