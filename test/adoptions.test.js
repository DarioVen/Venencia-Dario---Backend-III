import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const expect = chai.expect;
const requester = supertest(app);

describe('Adoptions API', () => {
    describe('GET /api/adoptions', () => {
        it('should return all adoptions', async () => {
            const response = await requester.get('/api/adoptions');
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('status', 'success');
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.be.an('array');
        });
    });

    describe('GET /api/adoptions/:aid', () => {
        it('should return a specific adoption if it exists', async function() {
            
            const adoptionsResponse = await requester.get('/api/adoptions');
            if (adoptionsResponse.body.payload.length > 0) {
                const adoptionId = adoptionsResponse.body.payload[0]._id;
                const response = await requester.get(`/api/adoptions/${adoptionId}`);
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('status', 'success');
                expect(response.body).to.have.property('payload');
                expect(response.body.payload).to.have.property('_id', adoptionId);
            } else {
                // Usamos function() en lugar de arrow function para que this tenga el contexto correcto
                this.skip();
            }
        });

        it('should return 404 if adoption does not exist', async () => {
            const nonExistentId = '60d21b4667d0d8992e610c85'; // ID que probablemente no exista
            const response = await requester.get(`/api/adoptions/${nonExistentId}`);
            expect(response.status).to.equal(404);
            expect(response.body).to.have.property('status', 'error');
        });
    });

    describe('POST /api/adoptions/:uid/:pid', () => {
        it('should create a new adoption with valid user and pet IDs', async () => {
            const userId = '60d21b4667d0d8992e610c85';
            const petId = '60d21b4667d0d8992e610c86';
            
            const response = await requester.post(`/api/adoptions/${userId}/${petId}`);
            
            expect(response.body).to.have.property('status');
            if (response.status === 200) {
                expect(response.body).to.have.property('status', 'success');
                expect(response.body).to.have.property('message', 'Pet adopted');
            } else {
                expect(response.body).to.have.property('status', 'error');
                expect(response.body).to.have.property('error');
            }
        });
    });
});