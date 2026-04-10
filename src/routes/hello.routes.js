'use strict';

const { Router } = require('express');
const { HelloController } = require('../controllers/hello.controller');
const { HelloService } = require('../services/hello.service');

const router = Router();
const helloController = new HelloController(new HelloService());

router.get('/', helloController.getHello);

module.exports = router;
