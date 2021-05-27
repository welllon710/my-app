import { Input } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
export const HeaderSearch = ({
  onSearch,
  onChange,
  value,
  hot,
  searchCtt = [],
}) => {
  const { Search } = Input;
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="header-search">
      <Search
        placeholder="搜索内容"
        onSearch={onSearch}
        className="search"
        value={value.keyword}
        onChange={onChange}
        onFocus={() => setIsShow(true)}
        onBlur={() => setIsShow(false)}
      />
      {!value.keyword ? (
        <Hot hot={hot} isShow={isShow} />
      ) : (
        <SearchContent value={value} searchCtt={searchCtt} isShow={isShow} />
      )}
    </div>
  );
};

const Hot = ({ hot, isShow }) => {
  return isShow ? (
    <div className="content">
      <div className="history"></div>
      <div className="hot">
        <h3>热搜榜</h3>
        <ul>
          {hot.map((item, index) => (
            <li key={index}>
              <div
                className="num"
                style={{ color: index + 1 - 0 <= 3 ? "#ff3a3a" : "" }}
              >
                {index + 1 - 0}
              </div>
              <div className="li-content">
                <div>
                  {item.searchWord}
                  <img src={item.iconUrl} alt="" />
                  <span>{item.score}</span>
                </div>
                <div>{item.content}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
};
const SearchContent = ({ value, searchCtt, isShow }) => {
  return isShow ? (
    <div className="content search-content">
      <div className="tips">
        搜<span>{value.keyword}</span>相关的结果
      </div>
      <div className="song">
        <div className="top">
          <div className="title">单曲</div>
          <ul>
            {searchCtt.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bottom top">
          <div className="title">专辑</div>
          <ul>
            <li>
              <span>光年之外-</span>G.E.M邓紫棋
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : null;
};
