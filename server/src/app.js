import express from "express"
import createError from "http-errors"
import cookieParser from "cookie-parser"
import router from "@router"
import cors from "@utils/cors"

const app = express()
const NODE_ENV = process.env["NODE_ENV"]

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(router)
app.use(cors)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = NODE_ENV === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json("something happened")
})

module.exports = app