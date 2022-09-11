import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { articleActions } from "../services/articleForm";

const actions = {
  ...articleActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
