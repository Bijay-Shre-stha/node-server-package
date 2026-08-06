const request = require('supertest');
const app = require('../app');

describe('App', () => {
    describe('GET /health', () => {
        it('should return server health', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status', 'success');
            expect(res.body).toHaveProperty('message', 'Server is healthy');
        });
    });
});
