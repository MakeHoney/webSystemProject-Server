const Seat = require('../../models/seat')
const { mount } = require('./controller')

router.post('/db-mount', mount)

module.exports = router
