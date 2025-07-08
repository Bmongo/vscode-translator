import { translate } from 'bing-translate-api'
import { Translator, TranslatorOptions } from './types'

export class BingTranslator implements Translator {
  config: TranslatorOptions

  constructor(config: TranslatorOptions) {
    this.config = config
  }

  langMap(type: string) {
    const map = new Map([
      ['auto', 'auto-detect'],
      ['zh-CN', 'zh-Hans'],
    ])
    return map.get(type) || type
  }

  async translate(text: string): Promise<string> {
    console.log('ssl', text)
    const { from, to } = this.config
    if (!text) {
      throw new Error('No text provided for translation')
    }
    const result = await translate(text, this.langMap(from), this.langMap(to))
    console.log(result)
    if (!result?.translation) {
      throw new Error('Translation failed: No sentences found in response')
    }
    return result?.translation
  }
}
