import mongoose, { InferSchemaType, Schema } from "mongoose";
const OfferSchema = new mongoose.Schema({
  vehicle: {
     type: Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  pricings: {
      type: Schema.Types.ObjectId,
    ref: "Pricing"
  },
  defaultPricing: {
      type: Schema.Types.ObjectId,
    ref: "Pricing"
  }
 
});

type Offer = InferSchemaType<typeof OfferSchema>;
// const Offer = mongoose.model("Offer", OfferSchema);
const Offer =mongoose.models.Offer || mongoose.model("Offer", OfferSchema);

export default Offer;
