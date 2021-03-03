import react from "react";
import { withRouter } from "react-router-dom";
import { Image } from "antd";
import "./square-priture.scss";
function Squarepriture(props) {
  const { text, sty, curw, goDetails } = props;

  return (
    <div
      className="square-priture"
      style={{ marginRight: sty, width: curw, height: curw }}>
      <div className="img-box">
        <Image
          preview={false}
          style={{ cursor: "pointer" }}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          onClick={() => goDetails("hhhh")}
        />
      </div>
      <div className="img-text">{text}</div>
    </div>
  );
}
export default Squarepriture;
