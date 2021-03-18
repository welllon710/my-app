import React, { memo, useState } from "react";
import { Route, NavLink } from "react-router-dom";
import "./index.scss";
export default memo(function Sider() {
  const [list, setList] = useState([
    {
      id: 1,
      path: "/dashboard/fount-music",
      name: "发现音乐",
    },
    {
      id: 2,
      path: "/dashboard/friends",
      name: "朋友",
    },
  ]);
  const setStyle = (index) => {};

  return (
    <div className="sider">
      {list.map((item, index) => {
        return (
          <div className="sider-path" key={item.id}>
            <NavLink
              key="item.id"
              activeStyle={{
                fontWeight: "600",
                fontSize: "25px",
                backgroundColor: "#f6f6f7",
              }}
              to={item.path}>
              {item.name}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
});
