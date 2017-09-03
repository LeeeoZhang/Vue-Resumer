const map = {
  202: 'The username is occupied',
  217: 'Invalid username',
  210: 'The username and password do not match',
  211: 'The username could not be found',
  unknown: 'The request failed and tried later'
}
export default function ({code}) {
  return map[code] || map.unknown
}
