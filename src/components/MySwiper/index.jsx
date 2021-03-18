import ColumnGroup from "antd/lib/table/ColumnGroup";
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
  memo,
} from "react";
import { useSelector } from "react-redux";
import { useWidth } from "../../my-hooks/_width";
import "./index.scss";
export default memo(function Swiper(props) {
  const { list } = props;
  const [state, setstate] = useState([]);
  //  const [currentW, setCurrentW] = useState(762);
  // let width = useSelector((state) => state.width);
  const [currentW, width] = useWidth();
  const [offsetL, setOffsetL] = useState(222);
  const [styleList, setStyleList] = useState([]);
  useEffect(() => {
    setstate(list);
  }, [list]);
  let a = 540;
  let timeOut = null;
  useMemo(() => {
    setStyleList((styleList) => {
      state.map((item, index) => {
        let i = index * 1 + 1;
        if (i <= 3) {
          styleList = [
            ...styleList,
            {
              transform: `translateX(${test(i) + "px"})${
                i == 2 ? "" : "scaleY(0.85)"
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
              transform: `translateX(${a + "px"}) scaleY(0.85)`,
              opacity: "0",
              transition: "0.5s",
            },
          ];
        }
      });
      return styleList;
    });
  }, [state]);
  const xin = useMemo(() => {
    if (currentW - 540 <= 340) {
      return currentW - 540;
    } else {
      return 640;
    }
  }, [currentW]);
  useMemo(() => {
    setStyleList((styleList) => {
      let arr = JSON.parse(JSON.stringify(styleList));
      arr.map((item, index) => {
        let i = index * 1 + 1;
        if (i <= 3) {
          item.transform = `translateX(${test(i) + "px"})${
            i == 2 ? "" : "scaleY(0.85)"
          }`;
          item.zIndex = `${i == 2 ? "2" : "1"}`;
        } else {
          a += offsetL;
          item.transform = `translateX(${a + "px"}) scaleY(0.85)`;
          delete item.opacity;
          delete item.zIndex;
        }
        return arr;
      });

      return arr;
    });
  }, [currentW]);
  const test = useCallback(
    (num) => {
      switch (num) {
        case 1:
          return 0;
        case 2:
          return xin / 2;
        case 3:
          return xin;
      }
    },
    [currentW]
  );
  useEffect(() => {
    console.log("重新旋转");
    timeOut = tt();
    return () => {
      clearInterval(timeOut);
    };
  }, []);
  const tt = () => {
    const timeOut = setInterval(() => {
      setStyleList((styleList) => {
        const _len = styleList.length;
        styleList = [styleList[_len - 1], ...styleList];
        styleList.pop();
        return styleList;
      });
    }, 2000);
    return timeOut;
  };

  return (
    <div className="my-swiper">
      <ul
        style={{ width: width <= 1200 ? "762px" : width - 1200 + 762 + "px" }}>
        {state.map((item, index) => {
          return (
            <li key={index} style={styleList[index]}>
              <img src={item.imageUrl} />
            </li>
          );
        })}
      </ul>
    </div>
  );
});
