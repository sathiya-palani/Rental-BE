const catchAsyncError = require('../middlewares/catchAsyncError');
const Booking = require('../models/bookingModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

//Create New Booking - api/v1/booking/new

exports.newBooking =  catchAsyncError( async (req, res, next) => {
    const {
        bookingItems,
        shippingInfo,
        rentalRate,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const  booking = await Booking.create({
        bookingItems,
        shippingInfo,
        rentalRate,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        booking
    })
})

//Get Single Booking - api/v1/order/:id
exports.getSingleBooking = catchAsyncError(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email');
    if(!booking) {
        return next(new ErrorHandler(`Booking not found with this id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        booking
    })
})

//Get Loggedin User Booking - /api/v1/mybookings
exports.myBookings = catchAsyncError(async (req, res, next) => {
    const bookings = await Booking.find({user: req.user.id});

    res.status(200).json({
        success: true,
        bookings
    })
})

//Admin: Get All Bookings - api/v1/bookings
exports.bookings = catchAsyncError(async (req, res, next) => {
    const bookings  = await Booking.find();

    let totalAmount = 0;

    bookings .forEach(booking => {
        totalAmount += booking.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        bookings 
    })
})


//Admin: Booking  Status - api/v1/booking/:id
exports.updateBooking =  catchAsyncError(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if(booking.bookingStatus == 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400))
    }
   
    booking.bookingStatus = req.body.bookingStatus;
    booking.deliveredAt = Date.now();
    await booking.save();

    res.status(200).json({
        success: true
    })
    
});

//Admin: Delete Booking - api/v1/order/:id
exports.deleteBooking  = catchAsyncError(async (req, res, next) => {
    const booking  = await Booking .findById(req.params.id);
    if(!booking ) {
        return next(new ErrorHandler(`Booking  not found with this id: ${req.params.id}`, 404))
    }

    await booking .remove();
    res.status(200).json({
        success: true
    })
})

