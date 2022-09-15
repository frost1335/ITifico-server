import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { articleActions } from "../services/articleForm";
import { authActions } from "../services/auth";
import { lngDetectActions } from "../services/lngDetector";

const actions = {
  ...articleActions,
  ...lngDetectActions,
  ...authActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
