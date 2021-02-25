import ColumnGroup from "antd/lib/table/ColumnGroup";
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import "./index.scss";
export default function Swiper() {
  const [state, setstate] = useState([
    {
      id: 1,
      img: "/assets/IMG_4966.jpg",
    },
    {
      id: 2,
      img: "/assets/IMG_4976.jpg",
    },
    {
      id: 3,
      img: "/assets/IMG_5093.jpg",
    },
    {
      id: 4,
      img: "/assets/IMG_5376.jpg",
    },
    {
      id: 5,
      img: "/assets/IMG_5395.jpg",
    },
    {
      id: 6,
      img: "/assets/IMG_5399.jpg",
    },
    {
      id: 7,
      img: "/assets/IMG_5407.jpg",
    },
    {
      id: 8,
      img: "/assets/IMG_5411.jpg",
    },
  ]);
  const [currentW, setCurrentW] = useState(762);
  const [offsetL, setOffsetL] = useState(222);
  const width = useSelector((state) => state.width);
  const [styleList, setStyleList] = useState([]);
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
  useMemo(() => {
    setCurrentW((currentW) => {
      if (width <= 1200) {
        return (currentW = 762);
      } else {
        return width - 1200 + 762;
      }
    });
  }, [width]);
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
            i == 2 ? "" : "scale(0.85)"
          }`;
          item.zIndex = `${i == 2 ? "2" : "1"}`;
        } else {
          a += offsetL;
          item.transform = `translateX(${a + "px"}) scale(0.85)`;
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
  useEffect(() => {
    clearInterval(timeOut);
  }, [width]);
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
        style={{ width: width <= 1200 ? "762px" : width - 1200 + 762 + "px" }}
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
