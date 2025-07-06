import { TranslatorOptions, TRANSLATOR_TYPE } from './types'
import { GoogleTranslator } from './google-translator'
import { getExtensionConfig } from '../vscode-config'

interface TranslatorProps extends TranslatorOptions {
  translator: (typeof TRANSLATOR_TYPE)[keyof typeof TRANSLATOR_TYPE]
}

export const getTranslator = (config: Partial<TranslatorProps> = {}) => {
  const defaultConfig = getExtensionConfig()
  const { from = defaultConfig.from, to = defaultConfig.to, translator = defaultConfig.translator } = config

  switch (translator) {
    case TRANSLATOR_TYPE.GOOGLE:
      return new GoogleTranslator({ from, to })
    default:
      throw new Error(`Unsupported translator type: ${config.translator}`)
  }
}

export * from './types'
