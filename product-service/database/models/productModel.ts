import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  photo: { type: [String], default: [] },
  discount: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
