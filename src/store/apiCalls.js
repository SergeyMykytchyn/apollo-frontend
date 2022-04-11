import { loginFailure, loginStart, loginSuccess } from "./userReducer";
import { registerFailure, registerSuccess, registerStart } from "./registerReducer";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  try {
    dispatch(loginStart());
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  try {
    dispatch(registerStart());
    console.log("registerStart");
    await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess());
    console.log("registerSuccess");
  } catch (err) {
    console.log("registerFailure");
    dispatch(registerFailure());
  }
};
