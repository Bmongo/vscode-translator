import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getTranslator, TRANSLATOR_TYPE } from '../src/translators'
import { GoogleTranslator } from '../src/translators/google-translator'
import { BingTranslator } from '../src/translators/bing-translator'
import * as lang from '../src/lang'

vi.mock('../src/vscode-config', () => ({
  getAllExtensionConfig: vi.fn(() => ({
    translator: TRANSLATOR_TYPE.BING,
    from: 'en',
    to: 'zh-CN',
  })),
}))

class MockGoogleTranslator {
  translate = vi.fn()
}

class MockBingTranslator {
  translate = vi.fn()
}

vi.mock('../src/translators/google-translator', () => ({
  GoogleTranslator: vi.fn(() => new MockGoogleTranslator()),
}))

vi.mock('../src/translators/bing-translator', () => ({
  BingTranslator: vi.fn(() => new MockBingTranslator()),
}))

vi.mock('../src/lang', () => ({
  t: vi.fn((key, params) => {
    if (key === 'unsupported_translator_type') {
      return `Unsupported translator type: ${params.translatorType}`
    }
    return ''
  }),
}))

describe('getTranslator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return a BingTranslator instance when translator is BING', () => {
    const translator = getTranslator({ translator: TRANSLATOR_TYPE.BING })
    expect(BingTranslator).toHaveBeenCalledWith({ from: 'en', to: 'zh-CN' })
    expect(translator).toBeInstanceOf(MockBingTranslator)
  })

  it('should return a GoogleTranslator instance when translator is GOOGLE', () => {
    const translator = getTranslator({ translator: TRANSLATOR_TYPE.GOOGLE })
    expect(GoogleTranslator).toHaveBeenCalledWith({ from: 'en', to: 'zh-CN' })
    expect(translator).toBeInstanceOf(MockGoogleTranslator)
  })

  it('should use default config if no config is provided', () => {
    const translator = getTranslator()
    expect(BingTranslator).toHaveBeenCalledWith({ from: 'en', to: 'zh-CN' })
    expect(translator).toBeInstanceOf(MockBingTranslator)
  })

  it('should use provided config over default config', () => {
    const translator = getTranslator({ from: 'zh-CN', to: 'en', translator: TRANSLATOR_TYPE.GOOGLE })
    expect(GoogleTranslator).toHaveBeenCalledWith({ from: 'zh-CN', to: 'en' })
    expect(translator).toBeInstanceOf(MockGoogleTranslator)
  })

  it('should throw an error for unsupported translator type', () => {
    expect(() => getTranslator({ translator: 'unsupported' as any })).toThrowError(
      'Unsupported translator type: unsupported'
    )
    expect(lang.t).toHaveBeenCalledWith('unsupported_translator_type', { translatorType: 'unsupported' })
  })
})
