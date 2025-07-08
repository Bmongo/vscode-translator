import { workspace } from 'vscode'
import { TRANSLATOR_TYPE } from './translators'

const EXTENSION_CONFIG_PREFIX = 'translator'

export const getAllExtensionConfig = () => {
  const config = workspace.getConfiguration(EXTENSION_CONFIG_PREFIX)
  return {
    translator: config.get<string>('translator') || TRANSLATOR_TYPE.BING,
    from: config.get<string>('from') || 'auto',
    to: config.get<string>('to') || 'zh-CN',
  }
}
