import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  imageName: String,
  imageUrl: String,
  imageId: String,
});

export default mongoose.model("Image", ImageSchema);
