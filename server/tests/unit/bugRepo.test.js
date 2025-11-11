// server/tests/unit/bugRepo.test.js
jest.mock('../../src/models/Bug', () => {
  return {
    create: jest.fn(async (doc) => ({ _id: 'm1', ...doc })),
    find: jest.fn(() => ({
      sort: jest.fn(async () => ([{ _id: 'm2', title: 'Bug A' }])),
    })),
    findByIdAndUpdate: jest.fn(async (id, data) => ({ _id: id, ...data })),
    findByIdAndDelete: jest.fn(async (id) => ({ _id: id, deleted: true })),
  };
});

const repo = require('../../src/repo/bugRepo');
const BugModel = require('../../src/models/Bug');

describe('bugRepo data-access', () => {
  test('createBug calls Model.create and returns created doc', async () => {
    const payload = { title: 'New', priority: 'low' };
    const out = await repo.createBug(payload);
    expect(BugModel.create).toHaveBeenCalledWith(payload);
    expect(out).toMatchObject({ _id: 'm1', title: 'New' });
  });

  test('getBugs calls Model.find().sort and returns list', async () => {
    const out = await repo.getBugs();
    expect(BugModel.find).toHaveBeenCalled();
    // ensure sort called with correct sort order
    expect(BugModel.find.mock.results[0].value.sort).toBeDefined();
    expect(Array.isArray(out)).toBe(true);
    expect(out[0]).toMatchObject({ _id: 'm2' });
  });

  test('updateBug calls findByIdAndUpdate and returns updated doc', async () => {
    const out = await repo.updateBug('abc123', { status: 'resolved' });
    expect(BugModel.findByIdAndUpdate).toHaveBeenCalledWith('abc123', { status: 'resolved' }, { new: true });
    expect(out).toMatchObject({ _id: 'abc123', status: 'resolved' });
  });

  test('deleteBug calls findByIdAndDelete', async () => {
    const out = await repo.deleteBug('abc123');
    expect(BugModel.findByIdAndDelete).toHaveBeenCalledWith('abc123');
    expect(out).toMatchObject({ _id: 'abc123', deleted: true });
  });
});
