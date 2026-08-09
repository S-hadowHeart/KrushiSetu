// Access tokens are kept in memory only — never in localStorage/sessionStorage.
// This limits the blast radius of an XSS bug: a script that runs in the page can
// still reach this module-level variable, but the token can't be exfiltrated
// from persistent storage after the tab is closed, and it never gets replayed
// automatically the way a cookie would. The long-lived refresh token lives in an
// httpOnly cookie set by the backend, so JS can never read it at all.

let accessToken = null;
let listeners = [];

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token) {
  accessToken = token;
  listeners.forEach((fn) => fn(token));
}

export function onAccessTokenChange(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}
