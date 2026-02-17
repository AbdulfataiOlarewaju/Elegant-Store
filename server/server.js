require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRouter = require("./routes/auth-routes");

const adminProductRouter = require("./routes/admin/products-routes");
const adminOdersRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes")
const shopCartRouter = require("./routes/shop/cart-routes")
const shopAddressRouter = require("./routes/shop/address-routes")
const shopOrderRouter = require("./routes/shop/order-routes")
const shopSearchRouter = require("./routes/shop/search-routes")
const shopReviewRouter = require("./routes/shop/review-routes")


const app = express();

mongoose
  .connect(
    process.env.MONGO_URL 
  //  Olarewaju
  )
  .then(() => console.log("mongodb connected successfully")) 
  .catch((err) => console.log("mongodb connection failed", err));   

app.use(
  cors({
    origin: process.env.ClIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"], 
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control", 
      "Expires",
      "Pragma",
    ],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", AuthRouter);

app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/orders", adminOdersRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter)
app.use("/api/shop/address", shopAddressRouter)
app.use("/api/shop/order", shopOrderRouter)
app.use("/api/shop/search", shopSearchRouter)
app.use("/api/shop/review", shopReviewRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is now listen to port ${PORT}`);   
});
