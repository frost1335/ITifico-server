const { Router } = require("express");
const { getAll, create, deleteOne, edit } = require("../controllers/images");
const router = Router();

router.route("/").get(getAll).post(create);
router.route("/:id").put(edit).delete(deleteOne);

module.exports = router;
