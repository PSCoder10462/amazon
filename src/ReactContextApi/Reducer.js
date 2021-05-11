import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from "./ActionTypes";

export const initialState = {
  basket: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case REMOVE_FROM_BASKET:
      console.log("aya");
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

    default:
      return { ...state };
  }
};

export default reducer;
