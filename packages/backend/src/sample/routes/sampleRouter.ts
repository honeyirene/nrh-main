import express from 'express';
import { sampleProtocol } from '@nrh/protocols';
import { registerProtocol } from '../../shared';
import { SampleApi } from "../apis";

const router = express.Router();

const api = new SampleApi();
const sample = registerProtocol(router, sampleProtocol, api);

export const sampleRoutes = [
	sample,
];
