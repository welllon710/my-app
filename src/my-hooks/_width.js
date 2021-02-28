import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
export const useWidth = () => {
    let width = useSelector((state) => state.width);
    const [currentWidth, setCurrentWidth] = useState(762);
    useMemo(() => {
    setCurrentWidth((currentWidth) => {
      if (width <= 1200) {
        return (currentWidth = 762);
      } else {
        if (width - 1200 + 762 >= 1140) {
          return 1140
        } else {
          return width - 1200 + 762;
        }
      }
    });
  
    }, [width]);

    return [currentWidth,width]
}