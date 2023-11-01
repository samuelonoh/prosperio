import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  // The 'userInfo' field stores user information. It is initialized either from local storage or as null.
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};


const authSlice = createSlice({
  // The 'name' identifies the slice and is used in the Redux store.
  name: 'auth',
  // Providing the initial state defined above.
  initialState,
  // The 'reducers' field contains a set of actions and their corresponding logic.
  reducers: {
    // 'setCredentials' action is used to set user credentials in the state and local storage.
    setCredentials: (state, action) => {
      // Update the 'userInfo' field in the state with the data provided in 'action.payload'.
      state.userInfo = action.payload;
      // Save the user information in local storage as well, converting it to a JSON string.
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // 'logout' action is used to clear user credentials from the state and local storage.
    logout: (state, action) => {
      // Set 'userInfo' to null in the state, indicating that the user is logged out.
      state.userInfo = null;
      // Remove the 'userInfo' item from local storage.
      localStorage.removeItem('userInfo');
    },
  },
});


export const { setCredentials, logout } = authSlice.actions;


export default authSlice.reducer;