const { Router } = require("express");
const {
  getAll,
  create,
  edit,
  deleteOne,
  getOne,
} = require("../controllers/lesson");

const router = Router();

router.route("/").get(getAll).post(create);
router.route("/:id").get(getOne).put(edit).delete(deleteOne);

module.exports = router;
