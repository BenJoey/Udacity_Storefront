import { ProductStore } from '../products';
const store = new ProductStore();

describe('Product Models', () => {
  let createdProdId: number;
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
    createdProdId = result.id as number;
    expect(result).toEqual({
      id: createdProdId,
      name: 'TestProduct',
      price: 200,
      category: 'TestCategory'
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: createdProdId,
        name: 'TestProduct',
        price: 200,
        category: 'TestCategory'
      }
    ]);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(createdProdId);
    expect(result).toEqual({
      id: createdProdId,
      name: 'TestProduct',
      price: 200,
      category: 'TestCategory'
    });
  });

  it('delete method should remove the product', async () => {
    await store.delete(createdProdId);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
