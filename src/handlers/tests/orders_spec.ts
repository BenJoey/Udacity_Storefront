import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('Test orders endpoints', () => {
  let authToken = '';
  let createdUserId = 0;
  let createdOrderId = 0;

  beforeAll(async () => {
    // create a user and an order to test orders by user endpoint
    const user = {
      username: 'oblong',
      firstname: 'John',
      lastname: 'Smith',
      password: 'password123'
    };
    const response = await request.post('/users').send(user);
    authToken = response.body as string;
    const decoded: { user: { id: number } } = jwt.decode(authToken) as {
      user: { id: number };
    };
    createdUserId = decoded.user.id as number;
  });

  it('create endpoint should add create the order', async () => {
    // create an order for the previously created user
    const response = await request
      .post('/orders')
      .send({ user_id: createdUserId })
      .set('Authorization', authToken);
    createdOrderId = response.body.id;
    expect(response.body.user_id).toEqual(String(createdUserId));
  });

  it('order by user endpoint should return the active order for the current user', async () => {
    const response = await request
      .get('/ordersbyuser/:id')
      .send({ user_id: createdUserId })
      .set('Authorization', authToken);
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('active');
  });

  afterAll(async () => {
    const resp1 = await request
      .delete('/orders')
      .send({ id: createdOrderId })
      .set('Authorization', authToken);
    const resp2 = await request
      .delete('/users')
      .send({ id: createdUserId })
      .set('Authorization', authToken);
  });
});
