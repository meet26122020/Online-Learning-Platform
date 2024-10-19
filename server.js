const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

require("./config/db");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");

app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

app.use("/api/v1", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/", lessonRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes);

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Online_Learning_Platform  API",
    version: "1.0.0",
    description: "API for managing Online_Learning_Platform",
  },
  servers: [
    {
      url: "http://localhost:5000/api", // Replace with your API base URL
    },
  ],
};
// Options for Swagger JSDoc
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [
    "./routes/userRoutes.js",
    "./routes/courseRoutes.js",
    "./routes/enrollmentRoutes.js",
    "./routes/lessonRoutes.js",
  ], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send(
    "<center><h1>online learning platform</h1><br>Get Recipe Api <a href=https://github.com/Devanshiballar/Online_Learning_Platform.git target=_blank>Repository :online learning platform</a></center>"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
