import { userAction } from "../reducers/userReducer";

export const logout = (type) => (dispatch,getState) => {
     dispatch(userAction.resetUserInfo());
     localStorage.removeItem("account");
};
