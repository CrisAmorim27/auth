export function replaceObj(str: string, obj: object) {
  return str.replace(new RegExp(Object.keys(obj).join('|'), 'g'), (key) => obj[key as keyof typeof obj]);
}