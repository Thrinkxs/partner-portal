import mongoose, { InferSchemaType, Schema } from "mongoose";
const VehicleSchema = new mongoose.Schema({
  vehicleMake: {
    type: String,
    required: true,
  
  },
  vehicleModel: {
    type: String,
    required: true,
  
  },
  coverImage:{
    type: String
  },
  images: {
    type: [String]
  }
 
});

type Vehicle = InferSchemaType<typeof VehicleSchema>;
// const Vehicle = mongoose.model("Vehicle", VehicleSchema);
const Vehicle =mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
