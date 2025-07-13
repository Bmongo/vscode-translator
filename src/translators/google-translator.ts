import got from 'got'
import { Translator, TranslatorOptions } from './types'
import { t } from '@/lang'

interface GoogleTranslateResponse {
  src: string
  sentences: Array<{
    trans: string
    orig: string
  }>
}

const translate = async (text: string, from: string, to: string) => {
  const result: GoogleTranslateResponse = await got
    .post('https://translate.google.com/translate_a/single', {
      timeout: { request: 10000 },
      searchParams: {
        client: 'at',
        sl: from,
        tl: to,
        hl: to,
        dt: 't',
        dj: '1',
        ie: 'UTF-8',
        oe: 'UTF-8',
        q: text,
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
      },
    })
    .json()
  if (!result?.sentences?.length) {
    throw new Error(t('no_sentences_response'))
  }
  return result.sentences.map(sentence => sentence.trans).join(' ')
}

export class GoogleTranslator implements Translator {
  config: TranslatorOptions

  constructor(config: TranslatorOptions) {
    this.config = config
  }

  async translate(text: string): Promise<string> {
    const { from, to } = this.config
    if (!text) {
      throw new Error(t('no_text_for_translation'))
    }
    return await translate(text, from, to)
  }
}
