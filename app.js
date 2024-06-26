require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;
const cors = require("cors");

app.use(cors());

// db connection
const dbConnection = require("./db/dbConfig");

//user routes middleware file
const userRouter = require("./Routes/userRoute");
//question routes middleware file
const questionRouter = require("./Routes/questionRoute");
//answers routes middleware file
const answerRouter = require("./Routes/answerRoute")

//authentication middleware file
const authMiddleware = require("./middleware/authMiddleware");

//json middleware to extract json data
app.use(express.json());

//user routes middleware
app.use("/api/users", userRouter);
//question routes middleware??
 app.use("/api/questions", authMiddleware, questionRouter);
 //Answers routes middleware
 app.use("/api/answers", authMiddleware, answerRouter);
 


//answers routes middleware??

async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
