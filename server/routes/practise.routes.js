const { Router } = require("express");
const {
  getAll,
  create,
  edit,
  deleteOne,
  getOne,
  getByLesson
} = require("../controllers/practise");

const router = Router();

router.route('/getbylesson/:id').get(getByLesson)
router.route("/").get(getAll).post(create);
router.route("/:id").get(getOne).put(edit).delete(deleteOne);

module.exports = router;
