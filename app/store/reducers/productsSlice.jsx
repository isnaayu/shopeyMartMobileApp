import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    product: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
        addProduct: (state, action) => {
            state.product.push(action.payload)
        }
    }
})

export const { setProduct, addProduct } = productSlice.actions
export default productSlice.reducer