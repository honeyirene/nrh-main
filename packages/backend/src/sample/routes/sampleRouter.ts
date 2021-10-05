import express from 'express';
import { sampleProtocol } from '@nrh/protocols';
import { registerProtocol } from '../../shared';
import { SampleApi } from "../apis";

const router = express.Router();

const api = new SampleApi();
registerProtocol(router, sampleProtocol.dataSheet, api);

export const sampleRouter = router;
