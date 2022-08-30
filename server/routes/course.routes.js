const {Router} = require('express')
const router = Router()

router.route('/').get().post()
router.route('/:id').put().delete()

module.exports = router