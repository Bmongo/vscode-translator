import { workspace } from 'vscode'
import { TRANSLATOR_TYPE } from './translators'

export enum LANGUAGE {
  AUTO = 'auto',
  CN = 'zh-CN',
  EN = 'en',
  TA = 'ta',
}

export const LANGUAGE_OPTIONS = [
  { label: 'Auto', value: LANGUAGE.AUTO },
  { label: 'Chinese', value: LANGUAGE.CN },
  { label: 'English', value: LANGUAGE.EN },
  { label: 'Tamil', value: LANGUAGE.TA },
]

export const SUPPORTED_LANGUAGES_FRANC_KEY_MAP: Record<string, string> = {
  cmn: LANGUAGE.CN,
  eng: LANGUAGE.EN,
  tam: LANGUAGE.TA,
}

const EXTENSION_CONFIG_PREFIX = 'devTranslator'

const DEFAULT_CONFIG = {
  translator: TRANSLATOR_TYPE.BING,
  from: LANGUAGE.EN,
  to: LANGUAGE.CN,
}

export const getAllExtensionConfig = () => {
  const config = workspace.getConfiguration(EXTENSION_CONFIG_PREFIX)
  return {
    translator: config.get<string>('translator') || DEFAULT_CONFIG.translator,
    from: (config.get<string>('from') || DEFAULT_CONFIG.from) as LANGUAGE,
    to: (config.get<string>('to') || DEFAULT_CONFIG.to) as LANGUAGE,
  }
}

export const getExtensionConfig = (key: string) => {
  const config = workspace.getConfiguration(EXTENSION_CONFIG_PREFIX)
  return config.get<string>(key) || (DEFAULT_CONFIG as Record<string, string>)[key]
}
