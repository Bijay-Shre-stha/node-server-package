const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test-db');
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User API', () => {
    describe('GET /api/users', () => {
        it('should return all users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('data');
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({ name: 'Test User', email: 'test@example.com' });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('status', 'success');
        });

        it('should reject missing name', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({ email: 'test@example.com' });
            expect(res.statusCode).toBe(400);
        });
    });
});
