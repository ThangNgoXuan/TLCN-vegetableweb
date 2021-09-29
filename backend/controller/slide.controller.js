import Slide from '../models/slide.model.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all slide is active
// @route   GET /v1/slides
// @access  Public
const slides = asyncHandler(async (req, res) => {
  const slides = await Slide.find({
    status: true
  });

  if (slides) {
    res.json(slides);
  } else {
    res.status(404)
    throw new Error('Slides not found!');
  }
});

// @desc    update slide
// @route   PUT /v1/slides/:id
// @access  Staff/Admin Private
const updateSlide = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    status,
    description,
    path
  } = req.body;

  const slide = await Slide.findById(req.params.id);

  if (slide) {
    slide.name = name;
    slide.image = image;
    slide.status = status;
    slide.description = description;
    slide.path = path;

    const updatedSlide = await Slide.save();
    res.json(updatedSlide);
  } else {
    res.status(404)
    throw new Error('Slides not found!');
  }
});
