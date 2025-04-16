// ShoppingCartReduxToolkit.jsx
import React from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

// Sample product data
const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 499.99,
    image: "/api/placeholder/100/100",
  },
  { id: 2, name: "Laptop", price: 999.99, image: "/api/placeholder/100/100" },
  {
    id: 3,
    name: "Headphones",
    price: 129.99,
    image: "/api/placeholder/100/100",
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 249.99,
    image: "/api/placeholder/100/100",
  },
];

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (quantity < 1) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }

      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export actions
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Create selectors
const selectCartItems = (state) => state.cart.items;
const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
const selectTotalPrice = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

// Create store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

// Cart component
const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart (Redux Toolkit)</h2>
        <div className="flex items-center">
          <ShoppingCart className="w-6 h-6 mr-2" />
          <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs">
            {totalQuantity}
          </span>
        </div>
      </div>

      {/* Product List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Products</h3>
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-3 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{product.name}</span>
                <span className="text-purple-600">${product.price}</span>
              </div>
              <button
                onClick={() => dispatch(addItem(product))}
                className="bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-600 mt-auto flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Items */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Cart Items</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-purple-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    className="p-1 rounded-full border"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-2 min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="p-1 rounded-full border"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="ml-3 p-1 rounded-full border text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="pt-3">
              <div className="flex justify-between mb-1">
                <span>Total Items:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrapped with provider
const ShoppingCartReduxToolkit = () => {
  return (
    <Provider store={store}>
      <Cart />
    </Provider>
  );
};

export default ShoppingCartReduxToolkit;
