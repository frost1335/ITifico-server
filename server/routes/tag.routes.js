const { Router } = require("express");
const { getAll, create, edit, deleteOne } = require("../controllers/tag");
const router = Router();

router.route("/").get(getAll).post(create);
router.route("/:id").put(edit).delete(deleteOne);

module.exports = router;
