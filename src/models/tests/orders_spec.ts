import { OrderStore } from '../orders';
import { UserStore } from '../users';
const store = new OrderStore();
const userStore = new UserStore();

describe('Order Models', () => {
  beforeAll(async () => {
    // create a user so that it can be referenced in orders table
    const result = await userStore.create({
      id: '1',
      username: 'oblong',
      firstname: 'John',
      lastname: 'Smith',
      password: 'password123'
    });
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
      status: 'active'
    });
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'active'
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        user_id: '1',
        status: 'active'
      }
    ]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'active'
    });
  });

  it('orderbyuser method should return the correct order by the userid', async () => {
    const result = await store.orderByUser('1');
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'active'
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
