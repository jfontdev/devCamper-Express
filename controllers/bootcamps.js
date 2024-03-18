// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
};

// @desc    Get one bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp with id: ${req.params.id}` });
};

// @desc    Create one bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.status(201).json({ success: true, msg: "Create new bootcamp" });
};

// @desc    Update one bootcamp
// @route   UPDATE /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Updated bootcamp with id: ${req.params.id}`,
  });
};

// @desc    Delete one bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(204)
    .json({ success: true, msg: `Deleted bootcamp with id: ${req.params.id}` });
};
