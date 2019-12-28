const baseUrl = ''
export default function request(url, requestConfig){
  url = baseUrl + url
  return fetch(url, requestConfig).then(res=>res.json())
}