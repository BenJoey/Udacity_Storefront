import client from '../database';

export type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get articles. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get article ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [product.name, product.price, product.category]);

      const prod = result.rows[0];

      conn.release();

      return prod;
    } catch (err) {
      throw new Error(`Could not add product ${product.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product. Error: ${err}`);
    }
  }
}
