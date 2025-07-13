import { SUPPORTED_LANGUAGES_FRANC_KEY_MAP } from '@/vscode-config'
import { franc, Options } from 'franc'

const FRANC_OPTIONS: Options = {
  minLength: 1, // 最小长度
  only: Object.keys(SUPPORTED_LANGUAGES_FRANC_KEY_MAP),
}

export const detectTextLanguage = (text: string): string => {
  const langType = franc(text, FRANC_OPTIONS)
  return SUPPORTED_LANGUAGES_FRANC_KEY_MAP[langType] as string
}
