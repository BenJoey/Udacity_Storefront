import client from '../database';

export type Order = {
  id?: number;
  user_id: string | number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [order.user_id, order.status]);

      const ord = result.rows[0];

      conn.release();

      return ord;
    } catch (err) {
      throw new Error(`Could not add order. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order. Error: ${err}`);
    }
  }

  async orderByUser(user_id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [user_id, 'active']);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order by user ${user_id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
