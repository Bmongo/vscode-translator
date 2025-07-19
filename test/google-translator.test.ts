import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GoogleTranslator } from '../src/translators/google-translator'
import got from 'got'
import { LANGUAGE } from '../src/vscode-config'
import * as lang from '../src/lang'

vi.mock('got', () => {
  const mockJson = vi.fn()
  const mockPost = vi.fn(() => ({
    json: mockJson,
  }))
  return {
    __esModule: true,
    default: {
      post: mockPost,
    },
  }
})

vi.mock('../src/lang', () => ({
  t: vi.fn(key => key),
}))

describe('GoogleTranslator', () => {
  let translator: GoogleTranslator

  beforeEach(() => {
    vi.clearAllMocks()
    translator = new GoogleTranslator({ from: LANGUAGE.EN, to: LANGUAGE.CN })
  })

  it('should throw an error if no text is provided for translation', async () => {
    await expect(translator.translate('')).rejects.toThrow('no_text_for_translation')
    expect(lang.t).toHaveBeenCalledWith('no_text_for_translation')
  })

  it('should call google translate api with correct parameters and return translation', async () => {
    vi.mocked(got.post().json).mockResolvedValueOnce({
      sentences: [{ trans: '你好', orig: 'hello' }],
    })
    const result = await translator.translate('hello')
    expect(got.post).toHaveBeenCalledWith(
      'https://translate.google.com/translate_a/single',
      expect.objectContaining({
        searchParams: expect.objectContaining({
          sl: 'en',
          tl: 'zh-CN',
          q: 'hello',
        }),
      })
    )
    expect(result).toBe('你好')
  })

  it('should throw an error if no sentences are returned', async () => {
    vi.mocked(got.post().json).mockResolvedValueOnce({ sentences: [] })
    await expect(translator.translate('hello')).rejects.toThrow('no_sentences_response')
    expect(lang.t).toHaveBeenCalledWith('no_sentences_response')
  })
})
