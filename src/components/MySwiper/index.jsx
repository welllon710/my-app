import ColumnGroup from "antd/lib/table/ColumnGroup";
import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
export default function Swiper() {
  const [state, setstate] = useState([
    {
      id: 1,
      img: "/assets/0.jpg",
    },
    {
      id: 2,
      img: "/assets/1.jpg",
    },
    {
      id: 3,
      img: "/assets/2.jpg",
    },
    {
      id: 4,
      img: "/assets/3.jpg",
    },
    {
      id: 5,
      img: "/assets/4.jpg",
    },
    {
      id: 6,
      img: "/assets/5.jpg",
    },
    {
      id: 7,
      img: "/assets/6.jpg",
    },
    {
      id: 8,
      img: "/assets/7.jpg",
    },
  ]);
  const [currentW, setCurrentW] = useState(762);
  const [offsetL, setOffsetL] = useState(222);
  const width = useSelector((state) => {
    return state.width;
  });
  const refwidth = useRef();
  const [styleList, setStyleList] = useState([]);
  let a = 540;

  useMemo(() => {
    console.log("执行usememo");
    setStyleList((styleList) => {
      state.map((item, index) => {
        let i = index * 1 + 1;
        if (i <= 3) {
          styleList = [
            ...styleList,
            {
              transform: `translateX(${test(i) + "px"})${
                i == 2 ? "" : "scale(0.85)"
              }`,
              transition: "0.5s",

              zIndex: `${i == 2 ? "2" : "1"}`,
            },
          ];
        } else {
          a += offsetL;
          styleList = [
            ...styleList,
            {
              transform: `translateX(${a + "px"}) scale(0.85)`,
              transition: "0.5s",
            },
          ];
        }
      });
      return styleList;
    });
  }, [state]);
  useEffect(() => {
    setCurrentW((currentW) => {
        currentW = refwidth.current.clientWidth
        console.log('currentW',currentW);
      return currentW;
    });
  
  }, [width]);
  useMemo(() => {
    setOffsetL((offsetL) => {
        offsetL = currentW - 540
        console.log('offsetL',offsetL);
      return offsetL;
    });
  }, [currentW])
  useMemo(() => {
    setStyleList(styleList=>{
    console.log('重新渲染');
       let arr =  JSON.parse(JSON.stringify(styleList))
       arr.map((item,index)=>{
            let i = index * 1 + 1;
            if(i <= 3){
                item.transform = `translateX(${test(i) + "px"})${   
                    i == 2 ? "" : "scale(0.85)"
                  }`
                item.zIndex = `${i == 2 ? "2" : "1"}`
            }else{
                a += offsetL;
                item.transform = `translateX(${a + "px"}) scale(0.85)`
            }
            return arr
        })
        console.log('c',arr);
        
        return arr
    })
    
    
  }, [currentW]);
  const test = useCallback((num)=>{
      console.log('useCall',offsetL);
    switch (num) {
        case 1:
          return 0;
        case 2:
            console.log('当前2222-》',offsetL);
          return offsetL / 2; // 2倍关系 最高300->600   最低130->260   760-540/2 = 110
        case 3:
          return offsetL;
      }
  },[offsetL])
//   const test = (num) => {
//     switch (num) {
//       case 1:
//         return 0;
//       case 2:
//           console.log('当前2222-》',offsetL);
//         return offsetL / 2; // 2倍关系 最高300->600   最低130->260   760-540/2 = 110
//       case 3:
//         return offsetL;
//     }
//   };
  // useEffect(() => {
  //     const timeOut = setInterval(() => {
  //         setStyleList(styleList=>{
  //             const _len = styleList.length
  //             styleList = [styleList[_len - 1],...styleList]
  //             styleList.pop()
  //             return styleList
  //         })
  //     }, 2000);
  //     return () => {
  //         clearInterval(timeOut)
  //     }
  // })

  return (
    <div className="my-swiper">
      <ul
        style={{ width: width <= 1200 ? "762px" : width - 1200 + 762 + "px" }}
        ref={refwidth}
      >
        {state.map((item, index) => {
          return (
            <li key={item.id} style={styleList[index]}>
              <img src={item.img} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
