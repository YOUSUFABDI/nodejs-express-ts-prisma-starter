import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import createHttpError, { isHttpError } from "http-errors"
import resHandler from "./middlewares/resMiddleware"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.options("*", cors())

// res handler middleware
app.use(resHandler)

app.get("/", (req, res) => {
  res.success("API is up and running.", 200)
})

app.use((req, res, next) => {
  next(createHttpError(404, "Enpoint not found."))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error)

  if (isHttpError(error)) {
    res.error(error.message, error.statusCode)
  } else {
    res.error("An unknown error occurred", 400)
  }
})

export default app
