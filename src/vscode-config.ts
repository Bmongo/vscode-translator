import { workspace } from 'vscode'
import { TRANSLATOR_TYPE } from './translators'

export enum LANGUAGE {
  AUTO = 'auto',
  CN = 'zh-CN',
  EN = 'en',
}

export const LANGUAGE_OPTIONS = [
  { label: 'Auto', value: LANGUAGE.AUTO },
  { label: 'Chinese', value: LANGUAGE.CN },
  { label: 'English', value: LANGUAGE.EN },
]

export const SUPPORTED_LANGUAGES_FRANC_KEY_MAP: Record<string, string> = {
  cmn: LANGUAGE.CN,
  eng: LANGUAGE.EN,
}

const EXTENSION_CONFIG_PREFIX = 'translator'

export const getAllExtensionConfig = () => {
  const config = workspace.getConfiguration(EXTENSION_CONFIG_PREFIX)
  return {
    translator: config.get<string>('translator') || TRANSLATOR_TYPE.BING,
    from: (config.get<string>('from') || LANGUAGE.EN) as LANGUAGE,
    to: (config.get<string>('to') || LANGUAGE.CN) as LANGUAGE,
  }
}
