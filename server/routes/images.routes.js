const { Router } = require("express");
const { getAll, create, deleteOne, edit } = require("../controllers/images");
const router = Router();

const ImageUpload = require("../utils/upload");

router.route("/").get(getAll).post(ImageUpload.single("file"), create);
router.route("/:id").put(ImageUpload.single("file"), edit).delete(deleteOne);

module.exports = router;
