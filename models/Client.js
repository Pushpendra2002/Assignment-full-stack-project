// backend/models/Client.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true, // like CEO, Web Developer, etc.
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
