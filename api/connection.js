const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://IEEEAswanSB:root@cluster0.u5g0lm3.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successed"))
  .catch((err) => console.log("connection falid with Error: ", err));


