const map = {
  202: '用户名以被占用',
  217: '无效的用户名',
  210: '用户名和密码不匹配',
  211: '找不到该用户名',
  unknown: '请求失败，稍后尝试'
}
export default function ({code}) {
  return map[code] || map.unknown
}
