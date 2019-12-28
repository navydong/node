const baseUrl = 'http://localhost:3000'
export default function request(url, requestConfig){
  url = baseUrl + url
  return fetch(url, requestConfig).then(res=>res.json())
}