import { franc, Options } from 'franc'

const LANG_ISO_MAP: Record<string, string> = {
  cmn: 'zh-CN',
  eng: 'en',
}

const FRANC_OPTIONS: Options = {
  minLength: 1, // 最小长度
  only: Object.keys(LANG_ISO_MAP),
}

export const detectTextLanguage = (text: string): string => {
  const langType = franc(text, FRANC_OPTIONS)
  return LANG_ISO_MAP[langType] as string
}
