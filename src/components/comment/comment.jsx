import React, { useMemo } from "react";
import { Image } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import "./comment.scss";
moment.locale("zh-cn");
export default function CommentItem(props) {
  
  
  const { beReplied, content, time, user } = props;
  let beRep =  useMemo(() => {
    if (beReplied.length === 0) {
      return false
    } else {
      return beReplied;
    }
  }, [beReplied]);
  return (
    <div className="comment-info">
      <Image width={40} src={user.avatarUrl} />
      <div className="conent">
        <div className="my-com">
          <span className="auth-nama"> {user.nickname}:</span>
          <span>{content}</span>
        </div>
        {beRep &&
          beRep.map((item,index) => {
            return (
              
                <div className="reply-com" key={index}>
                  <span className="auth-nama"> {item.user.nickname}:</span>
                  <span>{item.content}</span>
                </div>
             
            );
          })}

        <div className="reply-time">
          <div>{moment(time).fromNow()}</div>
        </div>
      </div>
    </div>
  );
}
