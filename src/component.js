import { store, remove, create, parse } from './base.js'

const sort = (s) => s ? s.split(' ').sort().join(' ') : NaN
const token = (obj, value) => obj
  ? Object.defineProperty(obj, 'token', { value })
  : store(tokenKey, value)

let tokenKey = 'twitch-token'
let elementName = 'twitch-login'

class TwitchLogin extends HTMLAnchorElement {
  get token () {
    return store(tokenKey)
  }

  connectedCallback () {
    const hash = parse(undefined, true)
    const save = this.hasAttribute('save')
    const scope = this.getAttribute('scope')
    if (!save) remove(tokenKey)
    if (
      (hash
        && sort(hash.scope) === sort(scope)
        && token(save ? false : this, hash.access_token))
      || this.token
      || !(this.href = create(
        this.getAttribute('client-id'),
        scope,
        this.getAttribute('redirect'),
        this.hasAttribute('force'),
        this.hasAttribute('anti-csrf')
          ? Math.random().toString(36).slice(2)
          : null
      ))
    ) {
      this.style.display = 'none'
    } else if (!this.innerText) {
      this.innerText = 'Login to Twitch'
    }
  }
}

export function useTwitchLogin (name, key) {
  if (name) {
    elementName = name
  }
  if (key) {
    tokenKey = key
  }
  customElements.define(elementName, TwitchLogin, { extends: 'a' })
}

export function getToken (sel) {
  const el = document.querySelector(sel || `a[is="${elementName}"]`)
  return el ? el.token : null
}
