const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leadsController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');


router.get('/',auth,leadsController.select);
router.get('/all/',auth,leadsController.selectAll);
router.get('/:id',auth,leadsController.selectId);
router.post('/',auth,leadsController.register);
router.put('/',auth,authProfile,leadsController.update);
router.delete('/:id',auth,authProfile,leadsController.delete);
router.put("/mudarEtapa/:id",auth, leadsController.updateEtapa);

module.exports = router;