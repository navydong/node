const baseUrl = process.env.NODE_ENV  === 'production'? '': 'http://localhost:3000'
export default function request(url, config) {
  url = baseUrl + url
  const requestConfig = Object.assign({
    type: 'GET',
    data: {}
  }, config)
  if (requestConfig.type === 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(requestConfig.data).forEach(key => {
      dataStr += key + '=' + requestConfig.data[key] + '&';
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }
  return fetch(url, requestConfig).then(res => res.json())
}