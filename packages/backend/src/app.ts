import express from 'express';
import cors from 'cors';
import { sampleRoutes } from './sample';

const app: express.Application = express();

const router = express.Router();
router.use(express.json({ limit: '5MB' }));
router.use(express.urlencoded({ extended: true }));
router.use(cors());

const routes = [
	...sampleRoutes,
];
for (const route of routes) {
	router.use(route.resource, route.router);
}

app.use(router);

export default app;
