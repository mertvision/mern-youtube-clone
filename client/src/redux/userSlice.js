/*
createSlice() : slice componentlerin oluşturulmasını sağlar. createSlice()
içerisinde "name: reducer adı", "initialState: başlangıç state'i" ve 
"reducers: çalıştırılacak fonksiyonlar" tanımlamaları yapılmalıdır.

  import {createSlice} from "@reduxjs/toolkit";

  const themeSlice = createSlice({
     name: "theme",
     initialState: {value: initialStateValue},
     reducers: {
         setTheme: (state, action) =>{
            state.value = action.payload;
            console.log(state.value)
         }
     }
  })
*/

import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    /* User durumu başlangıç değeri olarak 0'dır. */
    currentUser: null,
    /* Loading durumu başlangıçta false olacak, login olduğunda true'ya dönecek */
    loading: false,
    /* Eğer bir hata olursa error değeri true'ya dönecek. */
    error: false
};

export const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
        /* Reducers */
        loginStart: (state) => {
            /* Yüklenmeye başladığında true değerini alacak. */
            state.loading = true;
        },
        loginSuccess: (state, action, payload) => {
            /* Eğer başarılı olursa bir kullanıcımızın var olduğu anlamına gelir. 
            Kullanıcı gelirse loading false olacak. */
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            /* Kullanıcı değeri yüklendiğinde false değerini alacak. */
            state.loading = false;
            state.error = true;
        },
        logout: (state)=> {
            /* Logout işleminde state başlangıç değeri aktif olacak. */
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        }
      }
});

/* createAction() actionları export etmeyi sağlar, alternatif kullanımı `export const {} = slice.actions` 'dur */
export const {
    loginStart, 
    loginSuccess, 
    loginFailure, 
    logout
} = userSlice.actions;

export default userSlice.reducer;

/* createReducer() reducerların dışarı aktarılmasını sağlar. */