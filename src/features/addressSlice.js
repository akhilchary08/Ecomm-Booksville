import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  street: "",
  city: "",
  state: "",
  pincode: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    saveAddress: (state, action) => {
      state.street = action.payload.street;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.pincode = action.payload.pincode;
    },
  },
});

export default addressSlice.reducer;
export const {saveAddress}=addressSlice.actions;