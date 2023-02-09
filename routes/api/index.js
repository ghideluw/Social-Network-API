//Require express for use in the application
const router = require("express").Router();
//require the user route and the thought routes
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

//export this file for use outside this file
module.exports = router;