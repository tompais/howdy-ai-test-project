'use strict';

const { Router } = require('express');
const helloRoutes = require('./hello.routes');

const router = Router();

router.use('/hello', helloRoutes);

module.exports = router;
