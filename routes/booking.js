
const express = require('express');
const { newBooking, getSingleBooking, myBookings, bookings, updateBooking, deleteBooking } = require('../controllers/bookingController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');

router.route('/booking/new').post(isAuthenticatedUser,newBooking);
router.route('/booking/:id').get(isAuthenticatedUser,getSingleBooking);
router.route('/mybookings').get(isAuthenticatedUser,myBookings);

//Admin Routes
router.route('/admin/bookings').get(isAuthenticatedUser, authorizeRoles('admin'), bookings)
router.route('/admin/booking/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateBooking)
router.route('/admin/booking/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteBooking)

module.exports = router;