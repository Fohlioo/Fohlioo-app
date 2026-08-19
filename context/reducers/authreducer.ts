import { ActionType, REDUCERS } from "../../types";
import { AuthContextInterface } from "../../interface";


const authReducer = (state: AuthContextInterface, action: ActionType) => {
  const { payload } = action;

  switch (action.type) {
    case REDUCERS.SET_USER:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
