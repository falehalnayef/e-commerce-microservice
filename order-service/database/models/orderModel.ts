import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "cancelled"], default: "pending" },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
