import react from "react";
import { withRouter } from "react-router-dom";
import { Image } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import "./square-priture.scss";
function Squarepriture(props) {
  const { item, sty, curw, goDetails } = props;
  // const { picUrl } = item;

  return (
    <div
      className="square-priture"
      style={{ marginRight: sty, width: curw, height: curw }}>
      <div className="img-box">
        {item ? (
          <Image
            preview={false}
            style={{ cursor: "pointer" }}
            src={
              item
                ? item.picUrl
                : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
            onClick={() => goDetails("hhhh")}
          />
        ) : (
          <div className="every-day">
            <CalendarOutlined />
            <Image preview={false} src="/assets/bgc.png"></Image>
            <span className="data">18</span>
          </div>
        )}
      </div>
      <div className="img-text">{item ? item.name : "每日推荐歌曲"}</div>
    </div>
  );
}
export default Squarepriture;
