import * as vscode from 'vscode'
import zhCN from './zh-CN.json'
import en from './en.json'
import ta from './ta.json'
import { getExtensionConfig } from '@/vscode-config'

interface I18n {
  [key: string]: string
}

const LANGUAGE_DATA_MAP: Record<string, I18n> = {
  'zh-cn': zhCN,
  ta: ta,
  en: en,
}

export const t = (key: string, params?: Record<string, string>) => {
  const language = getExtensionConfig('language')
  const currentLanguage = language === 'auto' ? vscode.env.language : language
  let result = LANGUAGE_DATA_MAP[currentLanguage]?.[key] || LANGUAGE_DATA_MAP['en'][key]

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(`{{${k}}}`, v)
    }
  }
  return result
}
