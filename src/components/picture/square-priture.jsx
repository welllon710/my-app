import react from "react";
import { Image } from "antd";
import "./square-priture.scss";
export default function Squarepriture(props) {
  const { text, sty, curw } = props;
  return (
    <div
      className="square-priture"
      style={{ marginRight: sty, width: curw, height: curw }}>
      <div className="img-box">
        <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      </div>
      <div className="img-text">{text}</div>
    </div>
  );
}
