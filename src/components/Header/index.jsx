import React, { useState, useMemo, useEffect, useRef } from "react";
import { Input, Avatar, Modal, Form, Button, message, Popover } from "antd";
import {
  ArrowLeftOutlined,
  RightCircleOutlined,
  UserOutlined,
  LeftCircleOutlined,
  ArrowRightOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import QRCode from "qrcode.react";
import Apl_login from "../../api/login.js";
import { useDispatch, useSelector } from "react-redux";
import { requestList, useHot, useSearch } from "../../my-hooks/_request.js";
import useUrlState from "@ahooksjs/use-url-state";
import actions from "../../redux/actions";
import { HeaderSearch } from "../../components/HeaderSearch";
import "./index.scss";
import { useHistory } from "react-router";

export default function Header() {
  const { Search } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [time] = useState(new Date().getTime());
  const [key, setKey] = useState("");
  const [qrImg, setQrImg] = useState("");
  const [mode, setMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSignin, setIsSignin] = useState(false);
  const [timesOut, setTimesOut] = useState(null);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useUrlState({ keyword: "" });
  const history = useHistory();
  const { run,cancel, slists, setsLists } = useSearch(true);
  // 分界线
  const { lists } = useHot();
  let userInfo = useSelector((state) => state.userInfo);
  let isLogin = useMemo(() => {
    if (userInfo === null) {
      userInfo = {};
    }
    if (Object.keys(userInfo).length === 0) {
      return false;
    } else {
      return userInfo;
    }
  }, [userInfo]);
  let timeOut;
  //轮询二维码接口
  useEffect(() => {
    if (mode && isModalVisible) {
      if (key == "") return;
      timeOut = setInterval(async () => {
        setTimesOut(timeOut);
        let timestamp = new Date().getTime();
        const res = await requestList({
          ...Apl_login.qrCheck,
          params: { key, time: timestamp },
        });
        switch (res.code) {
          case 803:
            sessionStorage.setItem("cookie", res.cookie);
            message.success(res.message);
            dispatch(
              actions.saveUserInfo(
                JSON.parse(sessionStorage.getItem("nickName"))
              )
            );
            setIsModalVisible(false);
            clearInterval(timeOut);
            if (isLogin) sessionStorage.removeItem("nickName");
            break;
          case 802:
            const { nickname, avatarUrl } = res;
            sessionStorage.setItem(
              "nickName",
              JSON.stringify({ nickname, avatarUrl })
            );
            break;
          case 800:
            message.error(res.message);
            setIsModalVisible(false);
            clearInterval(timeOut);
            break;
        }
      }, 3000);

      return () => {
        clearInterval(timeOut);
      };
    }
  }, [key, mode, isModalVisible]);

  const onSearch = (data) => {
    setKeyword((pre) => {
      pre.keyword = data;
      if (keyword.keyword) {
        console.log('点我');
        history.push(`/fount-music/search-detail`);
      } else {
        cancel();
      }
      return pre;
    });
  };
  const onChange = (e) => {
    setKeyword((pre) => {
      pre.keyword = e.target.value;
      return pre;
    });
    if (keyword.keyword) {
      run({keyword:keyword.keyword});
    } else {
      setsLists([]);
      cancel();
    }
  };
  //登录弹出
  const showModal = async () => {
    setIsModalVisible(true);
    const res = await requestList({ ...Apl_login.createKey, params: { time } });
    const {
      data: { unikey },
    } = res;
    setKey(unikey);
    if (res.code === 200) {
      const response = await requestList({
        ...Apl_login.createQr,
        params: { key: unikey, time, qrimg: "yes" },
      });
      const {
        data: { qrurl },
      } = response;
      setQrImg(qrurl);
    }
  };

  const handleCancel = (data) => {
    setIsModalVisible(false);
    clearInterval(data);
  };
  //二维码登录
  const qrLogin = () => {
    return (
      <div className="qr-code">
        <QRCode
          value={qrImg} //value参数为生成二维码的链接
          size={200} //二维码的宽高尺寸
          fgColor="#000000" //二维码的颜色
        />
        <div className="tips">
          使用<span>网易云音乐APP</span>扫码登录
        </div>
        <div className="trigger" onClick={() => setMode(false)}>
          选择其他登录方式
          <ArrowRightOutlined />
        </div>
      </div>
    );
  };
  //常规登录
  const normalLogin = () => {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    //提交
    const onFinish = async (values) => {
      setLoading(true);

      const { phone, password } = values;
      const res = await requestList({
        ...Apl_login.phoneLogin,
        params: { phone, password },
      });
      if (res.code === 200) {
        setLoading(false);
        message.success("登录成功");
        sessionStorage.setItem("cookie", res.cookie);
        // localStorage.setItem("userInfo", res.profile);
        dispatch(actions.saveUserInfo(res.profile));
        setIsModalVisible(false);
      } else if (res.code === 502) {
        message.error("账号或密码错误");
        setLoading(false);
      }
    };
    const onFinishFailed = (errorInfo) => {};
    return (
      <div className="normal">
        <img src="/assets/login.png" alt="" />
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: "请输入手机号" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="trigger" onClick={() => setMode(true)}>
          <ArrowLeftOutlined />
          返回扫码登录方式
        </div>
      </div>
    );
  };

  const content = (
    <div className="quit-btn">
      <Button
        shape="round"
        icon={<BulbOutlined />}
        onClick={() => signin()}
        disabled={isSignin}
      >
        {isSignin ? "已签到" : "签到"}
      </Button>
      <Button
        type="primary"
        shape="round"
        icon={<BulbOutlined />}
        onClick={() => quitLogin()}
      >
        退出登录
      </Button>
    </div>
  );
  const quitLogin = () => {
    dispatch(actions.delUserInfo({}));
    sessionStorage.removeItem("cookie");
    message.success("退出成功");
  };
  const signin = async () => {
    const res = await requestList({
      ...Apl_login.signin,
      params: { cookie: sessionStorage.getItem("cookie") },
    });
    if (res.code === 200) {
      setIsSignin(true);
    }
  };
  return (
    <>
      <div className="wyy-header">
        <div className="header-left">
          <img src="/assets/wyylogo.jpg" alt="logo" onClick={() => history.push('/fount-music')} />
          <div className="fnc-cpm">
            <LeftCircleOutlined className="left-icon" />
            <RightCircleOutlined className="right-icon" />
            <HeaderSearch
              onSearch={onSearch}
              onChange={onChange}
              value={keyword}
              hot={lists}
              searchCtt={slists}
            />
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <Avatar
              icon={!isLogin ? <UserOutlined /> : ""}
              src={isLogin ? isLogin.avatarUrl : ""}
            />
            {isLogin ? (
              <Popover placement="bottom" content={content} trigger="click">
                <span className="user-status">{isLogin.nickname}</span>
              </Popover>
            ) : (
              <span className="user-status" onClick={showModal}>
                未登录
              </span>
            )}

            <span className="user-status">开通vip</span>
          </div>
        </div>
      </div>
      {/* login */}
      <Modal
        title={mode ? `扫码登录${timesOut}` : "账密登录"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => handleCancel(timesOut)}>
        {mode ? qrLogin() : normalLogin()}
      </Modal>
      {/* 个人信息 */}
    </>
  );
}
