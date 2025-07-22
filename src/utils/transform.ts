/**
 * 将按空格分隔的字符串转换为变量名格式，同时剔除空格和特殊字符。
 * 例如，将 "hello world" 转换为 "helloWorld"。
 * @param str 输入的字符串
 * @returns 转换后的变量名格式字符串数组
 */
export function transformVarString(str: string): string[] {
  const needToTransformStr = str.trim().toLocaleLowerCase()
  if (!needToTransformStr) {
    return []
  }
  const cleanedWords = needToTransformStr
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.replace(/[^a-z0-9A-Z]/g, '')) // 去除特殊字符,
  const bigCamelCase = cleanedWords
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('')
  const smallCamelCase = cleanedWords
    .map((word, index) => {
      return index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('')
  const snakeCase = cleanedWords.join('_')
  const kebabCase = cleanedWords.join('-')
  const upperSnakeCase = cleanedWords.map(word => word.toUpperCase()).join('_')
  return [smallCamelCase, bigCamelCase, upperSnakeCase, snakeCase, kebabCase]
}
