import { Input } from "antd";
import "./index.scss";
import { useState } from "react";
export const HeaderSearch = ({ onSearch, onChange, value }) => {
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
      {isShow ? <div className="content"></div> : null}
    </div>
  );
};
