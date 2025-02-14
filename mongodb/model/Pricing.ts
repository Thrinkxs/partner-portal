import mongoose, { InferSchemaType, Schema } from "mongoose";
const PricingSchema = new mongoose.Schema({
  vehicle: {
     type: Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  monthlyRate: {
    type: Number
  }
 
});

type Pricing = InferSchemaType<typeof PricingSchema>;
// const Pricing = mongoose.model("Pricing", PricingSchema);
const Pricing = mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema);

export default Pricing;
