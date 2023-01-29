export function snakeToCamel(str: string) {
  return str.split('_').map((item, index) => index !== 0 ? item[0].toUpperCase() + item.substring(1) : item).join('')
}