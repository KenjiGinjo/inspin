import { endOfWeek, startOfWeek } from 'date-fns'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'

export const BeijingDate = {
  getWeekRange: () => {
    const now = new Date()
    // 转换为北京时间
    const beijingTime = toZonedTime(now, 'Asia/Shanghai')
    // 获取本周一0点
    const weekStart = startOfWeek(beijingTime, { weekStartsOn: 1 })
    // 获取本周日23:59:59
    const weekEnd = endOfWeek(beijingTime, { weekStartsOn: 1 })

    // 转换为UTC时间
    const utcStart = fromZonedTime(weekStart, 'Asia/Shanghai')
    const utcEnd = fromZonedTime(weekEnd, 'Asia/Shanghai')

    return { start: utcStart, end: utcEnd }
  },
}
