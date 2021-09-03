import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type User = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get articles. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO products (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

      const hash = bcrypt.hashSync(
      user.password + process.env.BRCYPT_PASSWORD, 
      parseInt(process.env.SALT_ROUNDS as string)
   );

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hash
      ]);

      const us = result.rows[0];

      conn.release();

      return us;
    } catch (err) {
      throw new Error(`Could not add user ${user.firstname}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user. Error: ${err}`);
    }
  }
}
