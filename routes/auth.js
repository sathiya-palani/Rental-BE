const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');
const { 
    registerUser, 
    loginUser,
    logoutUser,
    getUserProfile,
    changePassword ,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser}  = require('../controllers/authController');

   

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

//  get user profile
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/password/change').put(isAuthenticatedUser,changePassword );
router.route('/update').put(isAuthenticatedUser, updateProfile);

//Admin routes
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'), getUser)
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateUser)
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUser);

module.exports = router;