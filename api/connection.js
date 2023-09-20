const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://ieeeasb-db:5o3frxOKAMJvd1D7@ieee-db.lla0cvb.mongodb.net/CodeStorm?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successed"))
  .catch((err) => console.log("connection falid with Error: ", err));


