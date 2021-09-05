import { ProductStore } from '../products';
const store = new ProductStore();

describe('Product Models', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      id: 1,
      name: 'TestProduct',
      price: 200,
      category: 'TestCategory'
    });
    expect(result).toEqual({
      id: 1,
      name: 'TestProduct',
      price: 200,
      category: 'TestCategory'
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'TestProduct',
        price: 200,
        category: 'TestCategory'
      }
    ]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      name: 'TestProduct',
      price: 200,
      category: 'TestCategory'
    });
  });

  it('delete method should remove the product', async () => {
    await store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
