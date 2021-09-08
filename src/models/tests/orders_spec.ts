import { OrderStore } from '../orders';
import { UserStore } from '../users';
const store = new OrderStore();
const userStore = new UserStore();

describe('Order Models', () => {
  let createdUserId:string = '';
  let createdOrderId:number = 0;

  beforeAll(async () => {
    // create a user so that it can be referenced in orders table
    const result = await userStore.create({
      id: 1,
      username: 'oblong',
      firstname: 'John',
      lastname: 'Smith',
      password: 'password123'
    });
    createdUserId = result.id as unknown as string;
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
      user_id: createdUserId as unknown as number,
      status: 'active'
    });
    createdOrderId = result.id as unknown as number;
    expect(result).toEqual({
      id: createdOrderId,
      user_id: String(createdUserId),
      status: 'active'
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: createdOrderId,
        user_id: String(createdUserId),
        status: 'active'
      }
    ]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show(createdOrderId);
    expect(result).toEqual({
      id: createdOrderId,
      user_id: String(createdUserId),
      status: 'active'
    });
  });

  it('orderbyuser method should return the correct order by the userid', async () => {
    const result = await store.orderByUser(createdUserId);
    expect(result).toEqual({
      id: createdOrderId,
      user_id: String(createdUserId),
      status: 'active'
    });
  });

  it('delete method should remove the order', async () => {
    await store.delete(createdOrderId);
    const result = await store.index();

    expect(result).toEqual([]);
  });

  afterAll(() => {
    userStore.delete(createdUserId as unknown as number);
  });
});
