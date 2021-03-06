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
import csrf from "csurf";
import cookieParser from "cookie-parser";

dotenv.config();

// ! Connects DataBase
connectDB();

const csrfProtection = csrf({
  cookie: {
    secure: true,
    // httpOnly: true,
    maxAge: 3600, // 1-hour
  },
});
const parseForm = express.urlencoded({ extended: false });

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(csrfProtection);

app.get('/getCSRFTOKEN', csrfProtection, function (req, res) {

  res.send({csrfToken: req.csrfToken() })
})

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": [
        "'self'",
        "'sha256-1kri9uKG6Gd9VbixGzyFE/kaQIHihYFdxFKKhgz3b80='",
      ],
      "img-src": ["'self'", "storage.googleapis.com"],
    },
  })
);
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`SERVER IS RUNNING ON PORT https://localhost:${PORT}`);
  }
});
