import mongoose from 'mongoose';

const slideShema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  image: { type: String, trim: true, required: true },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  description: { type: String, trim: true },
  path: { type: String, trim: true }
});

const Slide = mongoose.model('Slide', slideShema);
export default Slide;