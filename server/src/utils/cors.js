import express from "express"
import cors from "cors"

const whitelist = ["http://localhost"]
const corsOptionsDelegate = (req, callback) => {
  var corsOptions
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

export default corsOptionsDelegate