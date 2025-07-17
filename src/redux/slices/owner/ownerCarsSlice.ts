// redux/owner/ownerCarsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOwnerCars } from "@/services/owner/fetchers";

export const fetchOwnerCars = createAsyncThunk("ownerCars/fetch", async () => {
  const data = await getOwnerCars();
  console.log("Fetched owner cars:", data); // ✅ Log response from API
  return data.cars; // only return the array
});


const ownerCarsSlice = createSlice({
  name: "ownerCars",
  initialState: {
    cars: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchOwnerCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      });
  },
});

export default ownerCarsSlice.reducer;
