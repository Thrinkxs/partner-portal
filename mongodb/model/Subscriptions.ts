import mongoose, { InferSchemaType, Schema } from "mongoose";
const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  offer:{
    type: Schema.Types.ObjectId,
    ref: "Offer",
  },
  status: {
    type: String,
    default: "new"
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  duration: {
    type: Number
  },
  location: {
    type: String
  },
  selectedPricingObject: {
    type: Object
  }
});

type Subscriptions = InferSchemaType<typeof SubscriptionSchema>;
// const Subscriptions = mongoose.model("Subscriptions", SubscriptionSchema);
const Subscriptions = mongoose.models.Subscriptions || mongoose.model("Subscriptions", SubscriptionSchema);

export default Subscriptions;
