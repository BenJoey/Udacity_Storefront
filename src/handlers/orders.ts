import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orders';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const orders = await store.show(req.body.id);
  res.json(orders);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: 'open'
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.delete('/orders', destroy);
  // add product
  app.post('/orders/:id/products', addProduct);
};

export default orderRoutes;