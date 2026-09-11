import { navigate } from 'wouter/use-browser-location'

export function navBack(fallbackPath = '/', replace = false) {
  if (window.history.length > 1) {
    window.history.back()
  }
  else {
    navigate(fallbackPath, { replace })
  }
}
