import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as configModule from '@/vscode-config'
import { t } from '../src/lang'

vi.mock('@/vscode-config', () => ({
  getExtensionConfig: vi.fn(),
}))

describe('i18n translation', () => {
  const getExtensionConfig = configModule.getExtensionConfig as unknown as vi.Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it.each([
    ['en', 'Translator panel'],
    ['zh-cn', '翻译面板'],
    ['ta', 'மொழிபெயர்ப்பு பலகை'],
  ])('should return correct translation for "panel_title" in %s', (lang, expected) => {
    getExtensionConfig.mockReturnValue(lang)
    expect(t('panel_title')).toBe(expected)
  })

  it('should interpolate params in the translation string', () => {
    getExtensionConfig.mockReturnValue('en')
    const result = t('clipboard_copied', { text: 'Hello World' })
    expect(result).toBe('Translated text copied to clipboard: Hello World')
  })

  it('should fallback to English if the selected language is unsupported', () => {
    getExtensionConfig.mockReturnValue('es') // unsupported language
    expect(t('panel_title')).toBe('Translator panel')
  })

  it('should fallback to English if the key is missing in selected language', () => {
    getExtensionConfig.mockReturnValue('zh-cn')
    const result = t('non_existent_key')
    expect(result).toBeUndefined()
  })

  it('should return untranslated string with missing params', () => {
    getExtensionConfig.mockReturnValue('ta')
    const result = t('clipboard_copied') // missing {{text}}
    expect(result).toBe('மொழிபெயர்க்கப்பட்ட உரை கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டது: {{text}}')
  })
})
