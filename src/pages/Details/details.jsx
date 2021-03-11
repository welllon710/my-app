import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
export default function Details() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.goDetail(false));
  }, []);
  return <div className="music-details"></div>;
}
