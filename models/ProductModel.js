import mongoose from "mongoose";
import WebProduct from "../models/WebModel.js";
const ProductSchema = new mongoose.Schema(
  {
    codigo: {
      type: Number,
    },
    descripcion: {
      type: String,
    },
    codigo1: {
      type: String,
    },
    compra: Number,
    precio: Number,
    cajas: Number,
    categoria_l0: String,
    categoria_l1: String,
    modelo: String,
    color: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    imageUrl: String,
    imageId: String,
  },
  { timestamps: true }
);

ProductSchema.post("findOneAndUpdate", async function (doc) {
  try {
    // Update all WebProducts that reference the updated Product
    await WebProduct.updateMany(
      { "products.product": doc._id },
      {
        $set: {
          "products.$[elem].precio": doc.precio,
          "products.$[elem].cajas": doc.cajas,
        },
      },
      {
        arrayFilters: [{ "elem.product": doc._id }],
        multi: true,
      }
    );
  } catch (error) {
    console.error("Error updating WebProduct documents:", error);
  }
});

export default mongoose.model("Product", ProductSchema);
