import express from 'express';
import cors from 'cors';
import { resource_sample } from '@nrh/protocols';
import { sampleRouter } from './sample';

const app: express.Application = express();

const router = express.Router();
router.use(express.json({ limit: '5MB' }));
router.use(express.urlencoded({ extended: true }));
router.use(cors());

router.use(resource_sample, sampleRouter);

app.use(router);

export default app;
