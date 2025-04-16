// ShoppingCartUseReducer.jsx
import React, { useReducer, useEffect, useState } from "react";
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

// Action types
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedState = [...state];
        updatedState[existingItemIndex] = {
          ...updatedState[existingItemIndex],
          quantity: updatedState[existingItemIndex].quantity + 1,
        };
        return updatedState;
      } else {
        // Item doesn't exist, add it
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }

    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload);

    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      if (quantity < 1) {
        return state.filter((item) => item.id !== id);
      }

      return state.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    }

    default:
      return state;
  }
};

const ShoppingCartUseReducer = () => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate totals whenever cart changes
  useEffect(() => {
    const quantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const price = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setTotalQuantity(quantity);
    setTotalPrice(price);
  }, [cartItems]);

  // Action creators
  const addItem = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (productId, newQuantity) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { id: productId, quantity: newQuantity },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart (useReducer)</h2>
        <div className="flex items-center">
          <ShoppingCart className="w-6 h-6 mr-2" />
          <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
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
                <span className="text-green-600">${product.price}</span>
              </div>
              <button
                onClick={() => addItem(product)}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mt-auto flex items-center justify-center"
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
                    <p className="text-green-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full border"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-2 min-w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full border"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
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

export default ShoppingCartUseReducer;
