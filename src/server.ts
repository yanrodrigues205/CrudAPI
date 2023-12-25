import express from 'express';
import { routers } from "./routes";

const app = express();

app.use(express.json());
app.use(routers);

module.exports = app;


