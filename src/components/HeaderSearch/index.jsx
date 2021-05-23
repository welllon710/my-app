
import { Input } from "antd";
import './index.scss'
import { useState } from 'react';
export const HeaderSearch = ({ onSearch, onChange }) => {
  const { Search } = Input;
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="header-search">
      <Search
        placeholder="搜索内容"
        onSearch={onSearch}
        className="search"
        onChange={onChange}
        onFocus={() => setIsShow(true)}
        onBlur={() => setIsShow(false)}
      />
      {isShow ? <div className="content"></div> : null}
    </div>
  );
};