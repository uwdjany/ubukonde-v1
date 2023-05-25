import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import route from "./routes/index";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", route);
// Start the server
const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

export default app;
