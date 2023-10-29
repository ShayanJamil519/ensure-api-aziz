import express, { Request, Response } from "express";
import { RevenueDataModel } from "../models/revenueDataModel.js";
import User from "../models/userModel.js";

const router = express.Router();

// POST endpoint to pass user input data
router.post("/pass-data", async (req: Request, res: Response) => {
  try {
    // Extract user input data from req.body

    const {
      firstname,
      lastname,
      annualRecurringRevenue,
      yearOverYearGrowthRate,
      monthsOfRunway,
      companyName,
      isB2B,
      email,
    } = req.body;

    console.log("00000000", req.body);

    // Create an instance of the RevenueDataModel
    const revenueData = new RevenueDataModel(
      annualRecurringRevenue,
      yearOverYearGrowthRate,
      monthsOfRunway
    );
    const userData = new User({
      firstname,
      lastname,
      annualRecurringRevenue,
      yearOverYearGrowthRate,
      monthsOfRunway,
      companyName,
      isB2B,
      email,
    });
    await userData.save();

    // Now, you can use the revenueData object for further processing
    // For simplicity, we'll just respond with the received data
    const responseData = {
      annualRecurringRevenue: revenueData.annualRecurringRevenue,
      yearOverYearGrowthRate: revenueData.yearOverYearGrowthRate,
      monthsOfRunway: revenueData.monthsOfRunway,
    };

    res.json({
      message: "Data received and sent to another application.",
      data: { responseData: responseData, user: userData },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// New endpoint to calculate ARR divided by 4
router.post("/calculate-arr-quarter", (req: Request, res: Response) => {
  try {
    // Extract annual recurring revenue from req.body
    const { annualRecurringRevenue } = req.body;

    // Calculate ARR divided by 4
    const arrQuarter = annualRecurringRevenue / 4;

    res.json({ arrQuarter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// New endpoint to calculate months of runway trajectory
router.post("/calculate-months-of-runway", (req: Request, res: Response) => {
  try {
    // Extract loan amount from req.body (assuming it's the ARR divided by 4)
    const { loanAmount } = req.body;

    // Calculate the additional months of runway based on the loan amount
    // You can customize this calculation as needed
    const additionalMonthsOfRunway = loanAmount / 0.4;

    res.json({ additionalMonthsOfRunway });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
