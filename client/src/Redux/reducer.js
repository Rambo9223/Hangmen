import { createSlice } from "@reduxjs/toolkit"; // import the create slice function

const initialState = [];

// we use the createSlice function and pass the 3 required parameters
const newHangmanReducer = createSlice({
  name: "New Word",

  initialState,

  reducers: {
    // new game will take a new word, id and gamecount and push it to the state
    newGame: (state, action) => {
      state.push(action.payload);
      return state;
    },
    // remove old game will take any old/unused games out of the state array
    removeOldGame: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
// we export all of the reducers
export const { newGame, removeOldGame } = newHangmanReducer.actions;
export const reducer = newHangmanReducer.reducer;
