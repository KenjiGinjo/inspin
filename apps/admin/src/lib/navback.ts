import { navigate } from 'wouter/use-browser-location'

/**
 * 智能返回导航
 * @param fallbackPath 无法返回时的默认路径
 * @param replace 是否替换当前历史记录
 */
export function navBack(fallbackPath = '/', replace = false) {
  // 检查浏览器历史记录长度
  if (window.history.length > 1) {
    window.history.back()
  }
  else {
    // 无法返回时导航到默认路径
    navigate(fallbackPath, { replace })
  }
}
