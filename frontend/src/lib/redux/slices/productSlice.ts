import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// interface of each product
interface product {
    _id: string;
    name: string;
    price: number;
}

// initial state
const initialState: product[] = [];

// create product slice
const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {

        // set the initial all products
        setProducts: (state, action: PayloadAction<product[]>) => {
            state = [...action.payload];
            return state
        },
        // add the new product
        addProduct: (state, action: PayloadAction<product>) => {
            state.push(action.payload);
        },

        // update the product
        updateProduct: (state, action: PayloadAction<product>) => {
            const index = state.findIndex((p) => p._id === action.payload._id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },

        // delete the product
        deleteProduct: (state, action: PayloadAction<product>) => {
            const filterData = state.filter((p) => p._id !== action.payload._id)
            return filterData
        }
    }
})


export const { updateProduct, addProduct, setProducts, deleteProduct } = productSlice.actions

export default productSlice.reducer