require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { connectToMongoDB } = require("./connect");
const {
  restrictToLoggedinUserOnly,
  checkAuth,
} = require("./middlewares/auth");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 8001;

// MongoDB connection
connectToMongoDB(process.env.MONGODB)
  .then(() => {
    console.log("MongoDB connected");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

// View engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

// Short URL redirect
app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("URL redirect error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Started at PORT:${PORT}`);
});