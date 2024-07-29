/* 数字金额逢三加， 比如 123,464.23 */
export function numberToCurrency(value, num) {
    if (!value || value==0) return '0'
    // 将数值截取，不保留小数
    value = value.toFixed(num || 0)
    // 获取整数部分
    const intPart = Math.trunc(value)
    // 整数部分处理，增加,
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    // 预定义小数部分
    let floatPart = ''
    // 将数值截取为小数部分和整数部分
    const valueArray = value.toString().split('.')
    if (valueArray.length === 2) { // 有小数部分
        floatPart = valueArray[1].toString() // 取得小数部分
        if (floatPart != '00') {
            return intPartFormat + '.' + floatPart
        }
    }
    return intPartFormat 
  }
  