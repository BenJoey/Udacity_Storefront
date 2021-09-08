import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('Test orders endpoints', () => {
  let authToken = '';
  let createdProdId = 0;

  beforeAll(async () => {
    // create a signed in user to test auth required endpoints
    const payload = {
      username: 'oblong',
      firstname: 'John',
      lastname: 'Smith',
      password: 'password123'
    };
    const response = await request.post('/users').send(payload);
    authToken = response.body as string;
  });

  it('create endpoint should add a product', async () => {
    const payload = {
      name: 'TestProduct1',
      price: 200,
      category: 'TestCategory1'
    };
    const response = await request
      .post('/products')
      .send(payload)
      .set('Authorization', authToken);
    createdProdId = response.body.id;
    expect(response.body.name).toEqual('TestProduct1');
  });

  it('request without token should return 401 status', async () => {
    const response = await request.post('/products').send({});
    expect(response.status).toBe(401);
  });

  it('show endpoint should return the product', async () => {
    const response = await request
      .get('/products/:id')
      .send({ id: createdProdId });
    expect(response.body.name).toEqual('TestProduct1');
  });

  it('index endpoint should return all of the products', async () => {
    const response = await request.get('/products');
    expect(response.body[0].name).toEqual('TestProduct1');
  });

  afterAll(async () => {
    // delete the created product and user
    const response = await request
      .delete('/products')
      .send({ id: createdProdId })
      .set('Authorization', authToken);
    const decoded: { user: { id: string } } = jwt.decode(authToken) as {
      user: { id: string };
    };
    const resp = await request
      .delete('/users')
      .send({ id: decoded.user.id })
      .set('Authorization', authToken);
  });
});
