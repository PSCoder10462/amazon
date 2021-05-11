import { ADD_TO_BASKET, REMOVE_FROM_BASKET, SET_USER } from "./ActionTypes";

export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      const newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product {id: ${action.id}} as it does not exist in your cart`
        );
      }
      return { ...state, basket: newBasket };

    case SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return { ...state };
  }
};

export default reducer;
