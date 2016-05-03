'use strict';

var express = require('express');
var controller = require('./profil.controller');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var router = express.Router();

router.get('/', controller.index);
router.get('/:slug', controller.show);
router.post('/', controller.create);
router.put('/:slug', controller.update);
router.post('/upload', upload.single('file'), controller.upload);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
