import React, { useEffect } from "react";
import actions from "../redux/actions";
import { useDispatch } from "react-redux";
export const useHeight = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.goDetail(false));
  }, []);
};
