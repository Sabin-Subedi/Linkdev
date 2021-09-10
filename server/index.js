import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import cors from "cors";
import helmet from "helmet";
// import { bucket } from './firebase.js'

dotenv.config();

// ! Connects DataBase
connectDB();

const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
    directives: {

      "img-src": ["self","https://storage.googleapis.com/hello-de203.appspot.com"],

    },
  })
)

app.use(express.json());

app.use("/v1/auth/", authRoutes);
app.use("/v1/", postRoutes);
app.use("/v1/", profileRoutes);
app.use("/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is running.......");
  });
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`SERVER IS RUNNING ON PORT https://localhost:${PORT}`);
  }
});
