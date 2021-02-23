import React, { useState } from 'react'
import {Route,NavLink} from 'react-router-dom';
export default function Sider() {
  const [list,setList] = useState([
      {
          id:1,
          path:'/fount-music',
          name:'发现音乐'
      },
      {
        id:2,
        path:'/friends',
        name:'朋友'
    }
  ])
    return (
        <div className="sider">
            {
                list.map(item=>{
                    return (<NavLink key="item.id" to={item.path}></NavLink>)
                })
            }
        </div>
    )
}
