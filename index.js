const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const hpp = require("hpp");
const compression = require("compression");

dotenv.config();
require("./start/db")();

// Uncomment it if you need to seed the database
// require("./start/seeder")();

const app = express();
const port = process.env.PORT || 3000;

const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const errorHandler = require("./middlewares/errors");

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);
app.use(errorHandler);
app.use(hpp());
app.use(helmet());
app.use(compression());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
