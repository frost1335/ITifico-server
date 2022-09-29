const { Router } = require("express");
const {
  getAll,
  create,
  edit,
  deleteOne,
  getOne,
  editView,
} = require("../controllers/article");
const ImageUpload = require("../utils/upload");

const router = Router();

router.route("/").get(getAll).post(ImageUpload.single("image"), create);
router
  .route("/:id")
  .get(getOne)
  .patch(editView)
  .put(ImageUpload.single("image"), edit)
  .delete(deleteOne);

module.exports = router;
