import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    order_type: {
      type: String,
      enum: ["purchase", "order"],
    },
    third_party: String,
    date: Date,
    comment: String,
    orders: [{ codigo: Number, descripcion: String, cajas: Number }],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
