import Slide from '../models/slide.model.js';
import asyncHandler from 'express-async-handler';
import { HttpStatusCode } from '../utils/constants.js';

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

    const updatedSlide = await slide.save();
    res.json(updatedSlide);
  } else {
    res.status(404)
    throw new Error('Slides not found!');
  }
});

// @desc    Delete a slide
// @route   DELETE /v1/slide/:id
// @access  Private/Admin
const deleteSlide = asyncHandler(async (req, res) => {
  const slide = await Slide.findById(req.params.id);

  if (slide) {
    await slide.remove();
    res.json({ message: 'Xóa sản phẩm thành công' });
  }
  else {
    res.status(HttpStatusCode.NOT_FOUND);
    throw new Error('Không tìm thấy sản phẩm');
  }
});

// @desc create a slide
// @route POST /v1/slide
//@access Private/staff
const createSlide = asyncHandler(async (req, res) => {
  const slide = new Slide();

  slide.name = req.body.name;
  slide.image = req.body.image;
  slide.description = req.body.description;
  slide.path = req.body.path;

  const createdSlide = await slide.save();
  res.status(HttpStatusCode.CREATED_SUCCESS).json(createdSlide);
});

// @desc    Get  slide 
// @route   GET /v1/slide/:id
// @access  Public
const getSlide = asyncHandler(async (req, res) => {
  const slide = await Slide.findById(req.params.id);

  if (slide) {
    res.json(slide);
  } else {
    res.status(404)
    throw new Error('Slide not found!');
  }
});

export const slideController = {
  createSlide,
  slides,
  updateSlide,
  deleteSlide,
  getSlide,
};
