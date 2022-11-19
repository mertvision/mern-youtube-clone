import {createSlice} from "@reduxjs/toolkit";

const initialState = {
      currentVideo: null,
      loading: false,
      error: false,
};

export const videoSlice = createSlice({
      name: "video",
      initialState,
      reducers: {
        fetchStart: (state) => {
            /* Yüklenmeye başladığında true değerini alacak. */
            state.loading = true;
        },
        fetchSuccess: (state, action, payload) => {
            /* Eğer başarılı olursa bir kullanıcımızın var olduğu anlamına gelir. 
            Kullanıcı gelirse loading false olacak. */
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchFailure: (state) => {
            /* Kullanıcı değeri yüklendiğinde false değerini alacak. */
            state.loading = false;
            state.error = true;
        },
      }
});

export const {
    fetchStart, 
    fetchSuccess, 
    fetchFailure, 
} = videoSlice.actions;

export default videoSlice.reducer;
