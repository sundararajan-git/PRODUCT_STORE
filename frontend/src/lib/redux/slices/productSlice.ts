import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface product {
    _id: string;
    name: string;
    price: number;
    description: string;
    isCurrent: boolean;
    image: string
}

const initialState: product[] = [];

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<product[]>) => {
            state = [...action.payload];
            return state
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
        deleteProduct: (state, action: PayloadAction<product>) => {
            const filterData = state.filter((p) => p._id !== action.payload._id)
            return filterData
        }
    }
})


export const { updateProduct, addProduct, setProducts, deleteProduct } = productSlice.actions

export default productSlice.reducer