import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authActions } from "../services/auth";
import { lngDetectActions } from "../services/lngDetector";

const actions = {
  ...lngDetectActions,
  ...authActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
