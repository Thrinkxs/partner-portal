import mongoose, { InferSchemaType, Schema } from "mongoose";
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  referralPartner : {
    type: Schema.Types.ObjectId,
    ref: "Partner"
  }
});

type User = InferSchemaType<typeof UserSchema>;
// const User = mongoose.model("User", UserSchema);
const User = mongoose.models.User ||mongoose.model("User", UserSchema);

export default User;
