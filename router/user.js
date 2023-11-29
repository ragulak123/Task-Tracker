const { Router } = require("express");

const isAuth = require("../middleware/is-user");
const userController = require("../controller/user");
const viewUserController = require("../controller/viewUsers");

const router = Router({ strict: true });

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/auth-user", isAuth, userController.getAuthUser);
router.get("/users", viewUserController.getUsers);
module.exports = router;
