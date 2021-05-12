import {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  SET_USER,
  EMPTY_BASKET,
} from "./ActionTypes";

export const initialState = {
  basket: [],
  user: null,
};

export const getTotalPrice = (basket) => {
  let sum = 0;
  basket?.forEach((b) => {
    let num = "";
    for (let i = 0; i < b.price.length; ++i) {
      if (b.price[i] !== ",") num += b.price[i];
    }
    sum += Number(num);
  });
  return sum;
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

    case EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

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
