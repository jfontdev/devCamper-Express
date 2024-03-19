const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success: true, count: bootcamps.length, data: bootcamps});
    } catch (error) {
        res.status(400).json({success: false, msg: error.message});
    }
};

// @desc    Get one bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
        const customError= new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404);
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if (!bootcamp) {
            next(customError)
        }

        res.status(200).json({success: true, data: bootcamp});
    } catch (error) {
        next(customError)
    }
};

// @desc    Create one bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({success: true, data: bootcamp});
    } catch (error) {
        res.status(400).json({success: false, msg: error.message});
    }
};

// @desc    Update one bootcamp
// @route   UPDATE /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const updatedBootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!updatedBootcamp) {
            return res.status(400).json({success: false, msg: "Bootcamp not found"});
        }
        res.status(200).json({
            success: true,
            data: updatedBootcamp
        });
    } catch (error) {
        res.status(400).json({success: false, msg: error.message})
    }
};

// @desc    Delete one bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id )
        if (!bootcamp) {
            return res.status(400).json({success: false, msg: "Bootcamp not found"});
        }
        res.status(204).json({
            success: true,
        });
    } catch (error) {
        res.status(400).json({success: false, msg: error.message})
    }
};
