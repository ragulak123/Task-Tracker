const { Router } = require("express");

const isAuth = require("../middleware/is-admin");
const adminController = require("../controller/admin");

const router = Router({ strict: true });

router.post("/addtask", adminController.addTask);
router.get("/gettasks", adminController.getAllTasks);
router.put("/updatetask/:id", adminController.updateTask);
router.delete("/deletetask/:id", adminController.deleteTask);
router.get("/taskFind/:id", adminController.getStatus);

module.exports = router;
