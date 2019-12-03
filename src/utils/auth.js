// import Cookies from 'js-cookie'

export function getstore(params) {
  if (!localStorage[params]) {
    return ''
  } else {
    var str = localStorage[params]
    return str
  }
}

// localStorage存值(方便存取对象)
export function setstore(item, params) {
  var str = JSON.stringify(params)
  localStorage[item] = str
}
