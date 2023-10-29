import express from "express"; // Import express with TypeScript syntax
import bodyParser from "body-parser";
import dataController from "./controllers/dataController.js";
import { connectDb } from "./connectDatabase.js";
import cors from "cors";
// Correct import syntax for named exports
import dotenv from "dotenv";
const app = express();
const port = 5000;
dotenv.config();
connectDb();
// app.use(
//   cors({
//     // origin: "https://ensure-onboarding-screen.vercel.app/",
//     origin: "*",
//     credentials: true, //access-control-allow-credentials:true
//     // optionSuccessStatus: 200,
//   })
// );

app.get("/", (req, res) => {
  res.status(200).send("hello: hello ");
});

app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.json());

// Use the dataController for API routes
app.use("/api", dataController);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
