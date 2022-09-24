const { Router } = require("express");
const {
  getAll,
  create,
  deleteOne,
  edit,
  getOne,
  getList,
} = require("../controllers/course");
const router = Router();
const ImageUpload = require("../utils/upload");

router.route("/getlist/:id").get(getList);
router.route("/").get(getAll).post(ImageUpload.single("icon"), create);
router
.route("/:id")
.get(getOne)
.put(ImageUpload.single("icon"), edit)
.delete(deleteOne);

module.exports = router;
