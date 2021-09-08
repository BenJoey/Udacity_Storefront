import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('Test users endpoints', () => {
  let authToken: string = "";
  let createdUserId: number = 0;

  it('create endpoint should add create the user', async () => {
    const payload = {
      username: "oblong",
      firstname: "John",
      lastname: "Smith",
      password: "password123"
    };
    const response = await request.post('/users').send(payload);
    authToken = response.body as string;
    const decoded: {user: {id:number, username: string, firstname: string, lastname: string}} = jwt.decode(authToken) as {user: {id:number, username: string, firstname: string, lastname: string}};
    createdUserId = decoded.user.id;
    expect(decoded.user.username).toEqual('oblong');
    expect(decoded.user.firstname).toEqual('John');
    expect(decoded.user.lastname).toEqual('Smith');
  });

  it('show endpoint should return the user', async () => {
    const response = await request.get('/users/:id').send({id: createdUserId}).set('Authorization', authToken);
    expect(response.body.username).toEqual("oblong");
  });

  it('index endpoint should return all of the users', async () => {
    const response = await request.get('/users').set('Authorization', authToken);
    expect(response.body[0].username).toEqual("oblong");
  });

  afterAll( async () => {
    const resp = await request.delete('/users').send({id: createdUserId}).set('Authorization', authToken);
  });
});
