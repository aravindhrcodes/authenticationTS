// src/gateway.ts
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import { authenticateJWT } from './middleware/authenticate';

dotenv.config();
const app = express();

//Auth Service Proxy
app.use('/auth', createProxyMiddleware({
    target: 'http://localhost:9000',
    changeOrigin: true
}));

// Finance Service Proxy (protected)
app.use('/api/finances',authenticateJWT, createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true
}));

app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});
