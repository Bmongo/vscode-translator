import { workspace } from 'vscode'
import { TRANSLATOR_TYPE } from './translators'

const EXTENSION_CONFIG_PREFIX = 'translator'

export const getExtensionConfig = () => {
  const config = workspace.getConfiguration(EXTENSION_CONFIG_PREFIX)
  return {
    translator: config.get<string>('translator') || TRANSLATOR_TYPE.GOOGLE,
    from: config.get<string>('from') || 'auto',
    to: config.get<string>('to') || 'zh-CN',
  }
}
