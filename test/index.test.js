
import chai from 'chai';
import { before, after } from 'mocha';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

before(async function() {
    this.timeout(10000); 
    
    if (process.env.NODE_ENV !== 'test') {
        console.warn('ADVERTENCIA: Las pruebas no se están ejecutando en entorno de prueba');
    }
    
    if (mongoose.connection.readyState === 0) {
        try {
            
            const testDbUrl = process.env.TEST_MONGO_URL || process.env.MONGO_URL;
            if (!testDbUrl) {
                throw new Error('No se ha definido la URL de la base de datos de prueba');
            }
            
            await mongoose.connect(testDbUrl);
            console.log('Conectado a la base de datos de prueba');
        } catch (error) {
            console.error('Error al conectar a la base de datos de prueba:', error);
            throw error;
        }
    }
});

after(async function() {
});
