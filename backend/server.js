import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const MOCK_USER = {
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
};

app.get("/api/login", (req, res) => {
  res.json({
    message: "Login endpoint is working. Use POST to login.",
  });
});



app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // check credentials
  if (
    email === MOCK_USER.email &&
    password === MOCK_USER.password
  ) {
    return res.json({
      success: true,
      token: "mock-jwt-token",
      user: {
        email,
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});


app.get("/api/workflows", (req, res) => {
  res.json([
    {
      id: 1,
      name: "aquasec-automated-utility-job-at-0330pm",
      status: "active",
      enabled: true,
      owner: "airflow",
      runs: {
        queued: 0,
        running: 1,
        success: 5,
        failed: 0
      },
      schedule: "29 15 * * *",
      lastRun: "-",
      nextRun: "Jun 30, 2025 at 4:29 PM"
    },
    {
      id: 2,
      name: "aquasec-cspm-report-every-8hrs",
      status: "paused",
      enabled: false,
      owner: "airflow",
      runs: {
        queued: 0,
        running: 0,
        success: 3,
        failed: 1
      },
      schedule: "0 */8 * * *",
      lastRun: "-",
      nextRun: "Jul 3, 2025 at 1:00 AM"
    },
    {
      id: 3,
      name: "aquasec-cspm-report-every-12hrs",
      status: "paused",
      enabled: false,
      owner: "bazooka",
      runs: {
        queued: 0,
        running: 0,
        success: 0,
        failed: 0
      },
      schedule: "0 */8 * * *",
      lastRun: "-",
      nextRun: "Jul 3, 2025 at 1:00 AM"
    }
  ]);
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
