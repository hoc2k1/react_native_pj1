import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../../models';

interface CartState {
  carts: Cart[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  carts: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Cart>) => {
      state.carts.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateCartProducts: (
      state,
      action: PayloadAction<{
        cartId: number;
        products: Array<{ productId: number; quantity: number }>;
      }>,
    ) => {
      const cart = state.carts.find((c) => c.id === action.payload.cartId);
      if (cart) {
        cart.products = action.payload.products;
      }
    },
    // Thêm sản phẩm vào giỏ hàng
    addProductToCart: (
      state,
      action: PayloadAction<{
        cartId: number;
        product: { productId: number; quantity: number };
      }>,
    ) => {
      const cart = state.carts.find((c) => c.id === action.payload.cartId);
      if (cart) {
        const existingProduct = cart.products?.find(
          (p) => p.productId === action.payload.product.productId,
        );
        if (existingProduct) {
          existingProduct.quantity += action.payload.product.quantity;
        } else {
          cart.products = cart.products
            ? [...cart.products, action.payload.product]
            : [action.payload.product];
        }
      }
    },
    // Xóa sản phẩm khỏi giỏ hàng
    removeProductFromCart: (
      state,
      action: PayloadAction<{ cartId: number; productId: number }>,
    ) => {
      const cart = state.carts.find((c) => c.id === action.payload.cartId);
      if (cart) {
        cart.products = cart.products?.filter(
          (p) => p.productId !== action.payload.productId,
        );
      }
    },
    // Xóa toàn bộ giỏ hàng
    removeCart: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter((cart) => cart.id !== action.payload);
    },
    // Xóa tất cả giỏ hàng
    clearCarts: (state) => {
      state.carts = [];
      state.loading = false;
      state.error = null;
    },
    // Thiết lập trạng thái loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Thiết lập lỗi
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addCart,
  updateCartProducts,
  addProductToCart,
  removeProductFromCart,
  removeCart,
  clearCarts,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;