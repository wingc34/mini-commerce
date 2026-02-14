import { act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { useCart } from '@/store/cart-store';
import { type SKU } from '@prisma/client';

const sku_1 = {
  id: 'cmirbl751002xrv3rke52rw3n',
  skuCode: 'F5LYGMNKDZ',
  price: 49,
  attributes: { size: 'S', color: 'magenta' },
};

const sku_2 = {
  id: 'cmirbl7as002zrv3r8obi5k78',
  skuCode: '2C09FPTQVK',
  price: 937,
  attributes: { size: 'XL', color: 'purple' },
};

const getTestingProduct = (
  quantity: number,
  sku: {
    id: string;
    skuCode: string;
    price: number;
    attributes: SKU['attributes'];
  }
) => ({
  id: 'cmirbl6zg002vrv3ro97j7sth',
  name: 'Handmade Silk Tuna',
  quantity,
  sku,
  image: 'https://placehold.co/600x400',
});

// all store state need to use useCart.getState() so that state is updated

function resetCart() {
  act(() => useCart.getState().clearCart());
}

describe('cart-store', () => {
  beforeEach(() => {
    resetCart();
  });

  it('adds items and merges same product by id', () => {
    act(() => useCart.getState().addToCart(getTestingProduct(1, sku_1)));
    act(() => useCart.getState().addToCart(getTestingProduct(2, sku_1)));
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].quantity).toBe(3);
  });

  it('removes item by id and ignore non-existing id', () => {
    act(() => useCart.getState().addToCart(getTestingProduct(1, sku_1)));
    act(() => useCart.getState().addToCart(getTestingProduct(1, sku_2)));
    act(() => useCart.getState().removeItem('pX')); // non-existing id
    expect(useCart.getState().items).toHaveLength(2);
    act(() => useCart.getState().removeItem('F5LYGMNKDZ')); // remove sku_1
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].sku.skuCode).toBe('2C09FPTQVK'); // remaining sku_2
  });
});
