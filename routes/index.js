import express from 'express';
import * as voltageController from '../controllers/voltageController.js';
const router = express.Router();

router.get('/api', voltageController.getVoltages);

export { router };