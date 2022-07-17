

import express from "express"

const router = express.Router()

// define routes
router.get("/", (req, res) => {
  return res.json(" Welcome to Assignent")
})

export default router