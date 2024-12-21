import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface product {
    _id: string;
    name: string;
    price: number;
}

const initialState: product[] = [];


const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<product[]>) => {
            return action.payload;
        },
        addProduct: (state, action: PayloadAction<product>) => {
            state.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<product>) => {
            const index = state.findIndex((p) => p._id === action.payload._id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
    }
})


export const { updateProduct, addProduct, setProducts } = productSlice.actions

export default productSlice.reducer