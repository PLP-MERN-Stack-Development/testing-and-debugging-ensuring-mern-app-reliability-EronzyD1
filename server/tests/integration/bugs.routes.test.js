import request from 'supertest';
import app from '../../src/app.js';
import * as repo from '../../src/repo/bugRepo.js';

jest.mock('../../src/repo/bugRepo.js');

describe('Bugs API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('GET /api/bugs returns list', async () => {
    repo.getBugs.mockResolvedValue([{ _id: '1', title: 'Bug', status: 'open' }]);
    const res = await request(app).get('/api/bugs');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('POST /api/bugs validates input', async () => {
    const res = await request(app).post('/api/bugs').send({});
    expect(res.status).toBe(400);
    expect(res.body.error.message).toContain('Validation failed');
  });

  it('POST /api/bugs creates bug', async () => {
    const payload = { title: 'New', description: 'd', priority: 'low' };
    repo.createBug.mockResolvedValue({ _id: '2', ...payload, status: 'open' });
    const res = await request(app).post('/api/bugs').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New');
  });

  it('PATCH /api/bugs/:id updates bug', async () => {
    const updated = { _id: '2', title: 'New', status: 'resolved' };
    repo.updateBug.mockResolvedValue(updated);
    const res = await request(app).patch('/api/bugs/2').send({ status: 'resolved' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('DELETE /api/bugs/:id removes bug', async () => {
    repo.deleteBug.mockResolvedValue({ acknowledged: true });
    const res = await request(app).delete('/api/bugs/2');
    expect(res.status).toBe(204);
  });
});