import { Spin, Alert } from 'antd';
// 当前正在请求的数量
let requestCount = 0

// 显示loading
function showLoading () {
  if (requestCount === 0) {
      var dom = document.createElement('div')
      dom.setAttribute('id', 'loading')
      document.body.appendChild(dom)
      ReactDOM.render(<Spin tip="加载中..." size="large"/>, dom)
  }
  requestCount++
}

// 隐藏loading
function hideLoading () {
  requestCount--
  if (requestCount === 0) {
      document.body.removeChild(document.getElementById('loading'))
  }
}