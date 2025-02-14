import mongoose, { InferSchemaType, Schema } from "mongoose";
const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
 
});

type Partner = InferSchemaType<typeof PartnerSchema>;
// const Partner = mongoose.model("Partner", PartnerSchema);
const Partner = mongoose.models.Partner || mongoose.model("Partner", PartnerSchema);

export default Partner;
