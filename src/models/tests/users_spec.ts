import { UserStore } from '../users';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

describe('User Models', () => {
  let createdUserId: number;
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add an user', async () => {
    const result = await store.create({
      id: 1,
      username: 'oblong',
      firstname: 'John',
      lastname: 'Smith',
      password: 'password123'
    });
    createdUserId = result.id as number;
    expect(result.username).toEqual('oblong');
    expect(result.firstname).toEqual('John');
    expect(result.lastname).toEqual('Smith');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result[0].username).toEqual('oblong');
    expect(result[0].firstname).toEqual('John');
    expect(result[0].lastname).toEqual('Smith');
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(createdUserId);
    expect(result.username).toEqual('oblong');
    expect(result.firstname).toEqual('John');
    expect(result.lastname).toEqual('Smith');
  });

  it('delete method should remove the user', async () => {
    const prevResult = await store.index();
    await store.delete(createdUserId);
    const result = await store.index();

    expect(prevResult.length - result.length).toEqual(1);
  });
});
