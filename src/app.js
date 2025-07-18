import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import 'dotenv/config';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import { errorHandler } from './middlewares/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;
const connection = mongoose.connect(process.env.MONGO_URL);

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de API de Adopción de Mascotas',
            description: 'API para gestión de adopciones de mascotas'
        }
    },
    apis: ['./src/docs/*.yaml']
};

const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cookieParser());

// Ruta para la documentación Swagger
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

// Middleware de manejo de errores
app.use(errorHandler);


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
}

export default app;
