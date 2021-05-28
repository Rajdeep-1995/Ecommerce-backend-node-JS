const express = require("express");
const router = express.Router();

//controllers
const {
  create,
  listAll,
  remove,
  read,
  update,
} = require("../controllers/product");
//middleware for auth check
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.get("/product/:slug", read);
router.put("/product/:slug", update);
router.delete("/product/:slug", authCheck, adminCheck, remove);

module.exports = router;
