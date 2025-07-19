import { describe, it, expect, vi, beforeEach } from 'vitest'
import { translate } from 'bing-translate-api'
import { BingTranslator } from '../src/translators/bing-translator'
import { LANGUAGE } from '../src/vscode-config'
import * as lang from '../src/lang'

vi.mock('bing-translate-api', () => ({
  translate: vi.fn(),
}))

vi.mock('../src/lang', () => ({
  t: vi.fn(key => key),
}))

describe('BingTranslator', () => {
  let translator: BingTranslator

  beforeEach(() => {
    vi.clearAllMocks()
    translator = new BingTranslator({ from: LANGUAGE.EN, to: LANGUAGE.CN })
  })

  it('should map languages correctly', () => {
    expect(translator.langMap(LANGUAGE.AUTO)).toBe('auto-detect')
    expect(translator.langMap(LANGUAGE.CN)).toBe('zh-Hans')
    expect(translator.langMap(LANGUAGE.EN)).toBe('en')
    expect(translator.langMap(LANGUAGE.TA)).toBe('ta')
  })

  it('should throw an error if no text is provided for translation', async () => {
    await expect(translator.translate('')).rejects.toThrow('no_text_for_translation')
    expect(lang.t).toHaveBeenCalledWith('no_text_for_translation')
  })

  it('should call bing-translate-api with correct parameters and return translation', async () => {
    vi.mocked(translate).mockResolvedValueOnce({
      translation: '你好',
    } as any)
    const result = await translator.translate('hello')
    expect(translate).toHaveBeenCalledWith('hello', 'en', 'zh-Hans')
    expect(result).toBe('你好')
  })

  it('should throw an error if no translation is returned', async () => {
    vi.mocked(translate).mockResolvedValueOnce({ translation: undefined } as any)
    await expect(translator.translate('hello')).rejects.toThrow('no_sentences_response')
    expect(lang.t).toHaveBeenCalledWith('no_sentences_response')
  })
})
