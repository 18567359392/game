/**
 * 数字格式化工具
 * 用于显示大数字和科学计数法
 */

/**
 * 格式化大数字为可读格式
 * @param value 数值
 * @param decimals 小数位数
 * @returns 格式化后的字符串
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (value === 0) return '0'
  if (value < 0) return '-' + formatNumber(-value, decimals)
  
  // 小于1000直接显示
  if (value < 1000) {
    return value % 1 === 0 ? value.toString() : value.toFixed(decimals)
  }
  
  // 使用单位后缀
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc']
  const tier = Math.floor(Math.log10(value) / 3)
  
  if (tier === 0) {
    return value.toFixed(decimals)
  }
  
  if (tier < suffixes.length) {
    const suffix = suffixes[tier]
    const scale = Math.pow(10, tier * 3)
    const scaled = value / scale
    return scaled.toFixed(decimals) + suffix
  }
  
  // 超大数字使用科学计数法
  return value.toExponential(decimals)
}

/**
 * 格式化为科学计数法
 * @param value 数值
 * @param decimals 小数位数
 * @returns 科学计数法字符串
 */
export function formatScientific(value: number, decimals: number = 2): string {
  if (value === 0) return '0'
  return value.toExponential(decimals)
}

/**
 * 格式化时间(秒转换为易读格式)
 * @param seconds 秒数
 * @returns 格式化后的时间字符串
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.floor(seconds)}秒`
  }
  
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}分${secs}秒`
  }
  
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}小时${minutes}分`
  }
  
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  return `${days}天${hours}小时`
}

/**
 * 格式化百分比
 * @param value 数值(0-1)
 * @param decimals 小数位数
 * @returns 百分比字符串
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return (value * 100).toFixed(decimals) + '%'
}

/**
 * 格式化资源数量(带颜色标识)
 * @param current 当前数量
 * @param required 需要数量
 * @returns 是否足够
 */
export function hasEnoughResource(current: number, required: number): boolean {
  return current >= required
}

/**
 * 缩短数字显示(用于小空间显示)
 * @param value 数值
 * @returns 缩短后的字符串
 */
export function formatCompact(value: number): string {
  if (value < 1000) return Math.floor(value).toString()
  if (value < 1000000) return (value / 1000).toFixed(1) + 'K'
  if (value < 1000000000) return (value / 1000000).toFixed(1) + 'M'
  if (value < 1000000000000) return (value / 1000000000).toFixed(1) + 'B'
  return (value / 1000000000000).toFixed(1) + 'T'
}

/**
 * 格式化增长率
 * @param value 每秒增长值
 * @returns 格式化字符串
 */
export function formatRate(value: number): string {
  const prefix = value >= 0 ? '+' : ''
  return prefix + formatNumber(value, 2) + '/秒'
}
