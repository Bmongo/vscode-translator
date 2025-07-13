import * as vscode from 'vscode'
import zhCN from './zh-CN.json'
import en from './en.json'

interface I18n {
  [key: string]: string
}

export const t = (key: string, params?: Record<string, string>) => {
  let result = vscode.env.language === 'zh-cn' ? (zhCN as I18n)[key] : (en as I18n)[key]
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(`{{${k}}}`, v)
    }
  }
  return result
}
