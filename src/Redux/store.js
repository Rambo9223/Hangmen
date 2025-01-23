// we set up our store using configure store
import { configureStore } from "@reduxjs/toolkit";
//we import our reducer from the reducer.js file
import { reducer } from "./reducer";

const store = configureStore({
  reducer: reducer,
});
// we export the store to be added to our index file in the provider function
export default store;
