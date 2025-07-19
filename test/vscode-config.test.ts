import { describe, it, expect, vi } from 'vitest'
import * as vscode from 'vscode'
import {
  getAllExtensionConfig,
  getExtensionConfig,
  LANGUAGE,
  LANGUAGE_OPTIONS,
  SUPPORTED_LANGUAGES_FRANC_KEY_MAP,
} from '../src/vscode-config'
import { TRANSLATOR_TYPE } from '../src/translators'

vi.mock('vscode', () => ({
  workspace: {
    getConfiguration: vi.fn(() => ({
      get: vi.fn((key: string) => {
        if (key === 'translator') return TRANSLATOR_TYPE.BING
        if (key === 'from') return LANGUAGE.EN
        if (key === 'to') return LANGUAGE.CN
        return undefined
      }),
    })),
  },
}))

describe('vscode-config', () => {
  it('should export LANGUAGE enum correctly', () => {
    expect(LANGUAGE.AUTO).toBe('auto')
    expect(LANGUAGE.CN).toBe('zh-CN')
    expect(LANGUAGE.EN).toBe('en')
    expect(LANGUAGE.TA).toBe('ta')
  })

  it('should export LANGUAGE_OPTIONS correctly', () => {
    expect(LANGUAGE_OPTIONS).toEqual([
      { label: 'Auto', value: LANGUAGE.AUTO },
      { label: 'Chinese', value: LANGUAGE.CN },
      { label: 'English', value: LANGUAGE.EN },
      { label: 'Tamil', value: LANGUAGE.TA },
    ])
  })

  it('should export SUPPORTED_LANGUAGES_FRANC_KEY_MAP correctly', () => {
    expect(SUPPORTED_LANGUAGES_FRANC_KEY_MAP).toEqual({
      cmn: LANGUAGE.CN,
      eng: LANGUAGE.EN,
      tam: LANGUAGE.TA,
    })
  })

  describe('getAllExtensionConfig', () => {
    it('should return all extension configurations with default values if not set', () => {
      const config = getAllExtensionConfig()
      expect(config).toEqual({
        translator: TRANSLATOR_TYPE.BING,
        from: LANGUAGE.EN,
        to: LANGUAGE.CN,
      })
    })

    it('should return custom extension configurations if set', () => {
      vi.mocked(vscode.workspace.getConfiguration).mockReturnValueOnce({
        get: vi.fn((key: string) => {
          if (key === 'translator') return TRANSLATOR_TYPE.GOOGLE
          if (key === 'from') return LANGUAGE.CN
          if (key === 'to') return LANGUAGE.EN
          return undefined
        }),
      } as any)

      const config = getAllExtensionConfig()
      expect(config).toEqual({
        translator: TRANSLATOR_TYPE.GOOGLE,
        from: LANGUAGE.CN,
        to: LANGUAGE.EN,
      })
    })
  })

  describe('getExtensionConfig', () => {
    it('should return a specific extension configuration with default value if not set', () => {
      const config = getExtensionConfig('translator')
      expect(config).toBe(TRANSLATOR_TYPE.BING)
    })

    it('should return a specific extension configuration if set', () => {
      vi.mocked(vscode.workspace.getConfiguration).mockReturnValueOnce({
        get: vi.fn((key: string) => {
          if (key === 'translator') return TRANSLATOR_TYPE.GOOGLE
          return undefined
        }),
      } as any)

      const config = getExtensionConfig('translator')
      expect(config).toBe(TRANSLATOR_TYPE.GOOGLE)
    })

    it('should return default value for language if not set', () => {
      const config = getExtensionConfig('language')
      expect(config).toBe('auto')
    })
  })
})
