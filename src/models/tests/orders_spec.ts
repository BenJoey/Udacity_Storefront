import { OrderStore } from '../orders';
import { UserStore } from '../users';
const store = new OrderStore();
const userStore = new UserStore();

describe('Order Models', () => {
  beforeAll(async () => {
    const result = await userStore.create({
      id: '1',
      username: 'oblong',
      firstname: 'John',
      lastname: 'Smith',
      password: 'password123'
    });
    console.log('resid: ' + result.id);
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await store.create({
      id: 1,
      user_id: 1,
      status: 'open'
    });
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'open'
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        user_id: '1',
        status: 'open'
      }
    ]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'open'
    });
  });

  it('delete method should remove the order', async () => {
    await store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });

  afterAll(() => {
    userStore.delete(1);
  });
});
