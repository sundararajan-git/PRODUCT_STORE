import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface product {
    id: number;
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
            state.push(action.payload); // Add a single product
        },
        updateProduct: (state, action: PayloadAction<product>) => {
            const index = state.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload }; // Update the product
            }
        },
    }
})


export const { updateProduct } = productSlice.actions

export default productSlice.reducer