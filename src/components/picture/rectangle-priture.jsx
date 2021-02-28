import React, { useRef, useMemo, memo, useEffect } from "react";
import { useWidth } from "../../my-hooks/_width";
import { Image } from "antd";
import "./rectangle-priture.scss";
function RectanglePriture(props) {
  const [currentW, width] = useWidth();
  const { text, sty, curw, _length } = props;
  const totalOffset = currentW * (parseFloat(sty) / 100) * 2;
  const imgW = (currentW - totalOffset) / _length; //计算图片宽度
  return (
    <div
      className="rectangle-priture"
      style={{ marginRight: sty, width: curw, height: imgW / 2 }}>
      <div className="img-box">
        <Image
          height={imgW / 2}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </div>
      <div className="img-text">{text}</div>
    </div>
  );
}
export default memo(RectanglePriture);
