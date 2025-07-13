import { translate } from 'bing-translate-api'
import { Translator, TranslatorOptions } from './types'
import { LANGUAGE } from '@/vscode-config'
import { t } from '@/lang'

export class BingTranslator implements Translator {
  config: TranslatorOptions

  constructor(config: TranslatorOptions) {
    this.config = config
  }

  langMap(type: LANGUAGE) {
    const map = new Map([
      [LANGUAGE.AUTO, 'auto-detect'],
      [LANGUAGE.CN, 'zh-Hans'],
    ])
    return map.get(type) || type
  }

  async translate(text: string): Promise<string> {
    const { from, to } = this.config
    if (!text) {
      throw new Error(t('no_text_for_translation'))
    }
    const result = await translate(text, this.langMap(from), this.langMap(to))
    if (!result?.translation) {
      throw new Error(t('no_sentences_response'))
    }
    return result?.translation
  }
}
