const URL = 'https://id.twitch.tv/oauth2/authorize?'

export const remove = (key) => sessionStorage.removeItem(key)

export const store = (key, value) => {
  if (value === undefined) {
    return sessionStorage.getItem(key)
  } else {
    sessionStorage.setItem(key, value)
    return value
  }
}

let csrfKey = 'twitch-csrf'

export function create (clientID, scope, redirect, force, csrf) {
  if (!clientID || !scope) return ''
  const params = {
    client_id: clientID,
    response_type: 'token',
    scope: scope.replace(/ /g, '+'),
    redirect_uri: encodeURIComponent(redirect || location.href),
  }
  if (force) {
    params.force_verify = true
  }
  if (csrf) {
    params.state = store(csrfKey, csrf)
  }
  return URL + Object.entries(params).map((i) => i.join('=')).join('&')
}

export function parse (hash = location.hash, clear = false) {
  if (!hash) return null
  const csrf = store(csrfKey)
  const param = new URLSearchParams(hash.substring(1))
  const { state, ...r } = Object.fromEntries(param.entries())
  if (clear) {
    history.pushState(null, null, ' ')
  }
  if (csrf) {
    remove(csrfKey)
    if (csrf !== state) return null
  }
  return r
}

export function setKey (key) {
  csrfKey = key
}
