import mongoose from "mongoose";
// const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter last name"],
  },
  annualRecurringRevenue: {
    type: String,
    required: [true, "Please enter annual Recurring Revenue"],
  },
  yearOverYearGrowthRate: {
    type: String,
    required: [true, "Please enter year Over Year Growth Rate"],
  },
  monthsOfRunway: {
    type: String,
    required: [true, "Please enter months Of Runway"],
  },
  companyName: {
    type: String,
    required: [true, "Please enter company name."],
  },
  isB2B: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please enter username"],
    unique: true,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
