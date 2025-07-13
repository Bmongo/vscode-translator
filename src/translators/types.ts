import { LANGUAGE } from '@/vscode-config'

export const TRANSLATOR_TYPE = {
  GOOGLE: 'google',
  BING: 'bing',
} as const

export interface TranslatorOptions {
  from: LANGUAGE
  to: LANGUAGE
}

export abstract class Translator {
  /** 翻译器配置 */
  config: TranslatorOptions

  /** 翻译器语言映射 */
  langMap?: (type: LANGUAGE) => string

  /**
   * 创建翻译器实例
   * @param config 翻译器配置
   */
  constructor(config: TranslatorOptions) {
    this.config = config
  }

  /**
   * 翻译文本
   * @param text 要翻译的文本
   * @param options 翻译选项
   * @returns 翻译后的文本
   */
  abstract translate(text: string, options?: TranslatorOptions): Promise<string>
}
