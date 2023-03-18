import { REMOVE_ALERT, SET_ALERT } from "./types";

export const setAlert = (msg) => (dispatch) => {
  const id = "54125";
  dispatch({ type: SET_ALERT, payload: { msg, id } });
};
