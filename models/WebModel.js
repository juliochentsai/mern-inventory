import mongoose from "mongoose";
import Product from "../models/ProductModel.js";

const ProductDetailSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    cajas: {
      type: Number,
      min: 0, // Ensure quantity is non-negative
      default: 1,
    },
    precio: {
      type: Number,
      default: 0,
      min: 0, // Ensure price is non-negative
    },
  },
  { _id: false }
);

const WebSchema = new mongoose.Schema(
  {
    products: [ProductDetailSchema],
    description: String,
    // other fields as needed
  },
  { timestamps: true }
);

WebSchema.pre("save", async function (next) {
  try {
    // Ensure `this.products` is an array
    if (!Array.isArray(this.products)) {
      return next(new Error("Products must be an array"));
    }

    // Iterate through each product detail to fetch and populate fields
    for (let productDetail of this.products) {
      const product = await Product.findById(productDetail.product).exec();
      if (product) {
        productDetail.cajas = product.cajas;
        productDetail.precio = product.precio;
        // You can also set additional fields if needed
      } else {
        return next(
          new Error(`Product not found for ID ${productDetail.product}`)
        );
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("WebProduct", WebSchema);
