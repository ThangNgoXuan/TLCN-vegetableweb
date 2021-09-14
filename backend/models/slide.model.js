import mongoose from 'mongoose';

const slideShema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  image: { type: String, trim: true, required: true },
  status: { type: Boolean, default: true, required: true },
});

const Slide = mongoose.model('Slide', slideShema);
export default Slide;