# twitch-login
> A [Custom Element](https://webcomponents.org/) that extends `<a>` to handle the Twitch OAuth login flow

**This is for developers who are creating Twitch-related applications. [If you want to login to Twitch, please head over to the actual site.](https://www.twitch.tv/login)**

## Usage

**Note** You will need to have an app in the [Developer Console](https://dev.twitch.tv/console/), and check the [OAuth login flow](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth)

### ES6 `import`
```html
// html
<a is="twitch-login" scope="user:edit" client-id="[Client ID]">Login</a>
```
```javascript
// js
import { getToken } from "https://cdn.skypack.dev/twitch-login/a"
const token = getToken()
```

### `<script>` tag in HTML
Inner text defaults to "Login to Twitch"
```html
// html
<script type="module" src="https://cdn.skypack.dev/twitch-login/a"></script>
<a id="login" is="twitch-login" scope="user:edit" client-id="[Client ID]"></a>
```
```javascript
// js
const token = document.querySelector('#login').token
```

### Styling
```css
a[is="twitch-login"] {
  padding: 10px;
  display: block;
  color: #f0f0ff;
  text-align: center;
  text-decoration: none;
  background-color: #9146ff;
}
```

## Attributes

- `client-id` - (required) Client ID from the [Developer Console](https://dev.twitch.tv/console/apps/).
- `scope` - (required) Space-seperated list of [scopes](https://dev.twitch.tv/docs/authentication/#scopes)
- `redirect` - (default: `window.location.host`) URL to redirect the user to after the login
- `force` - (default: `false`) Re-prompt the user to login
- `anti-csrf` - (default: `false`) Use a CSRF-token

Ensure that the Redirect URL is in the list for your application.