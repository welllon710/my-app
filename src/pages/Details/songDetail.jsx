import React, { useState,memo, useEffect,useMemo } from "react";
import { Image } from "antd";
import { Button, Table, Tabs, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { SmileOutlined } from "@ant-design/icons";
import { useDetail, requestList } from "../../my-hooks/_request";
import { useHeight } from "../../my-hooks/useHeight";
import Api_ from "../../api/foundMusic";
import CommentItem from "../../components/comment/comment";
import moment from "moment";
import "./songDetail.scss";
import actions from "../../redux/actions";
import { useDispatch } from "react-redux";
const { TabPane } = Tabs;
const { TextArea } = Input;
export default memo(function SongDetail(props) {
  const {
    match: { params },
  } = props;
  useHeight();
  const dispatch =  useDispatch()
  const { lists } = useDetail({ id: params.id });
  useMemo(() => {
   console.log(" Object.values(lists);", Object.values(lists));
  }, [lists])
  return (
    <div className="songDetail">
     
    </div>
  );
})
