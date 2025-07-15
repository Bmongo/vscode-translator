import * as vscode from 'vscode'
import { getTranslator } from '@/translators'
import { logger } from '@/utils/logger'
import { withLoading } from '@/utils/loading'
import { LANGUAGE } from '@/vscode-config'
import { t } from '@/lang'

const callback = async () => {
  try {
    const text = await vscode.window.showInputBox({
      prompt: t('input_translate_to_chinese_prompt'),
      placeHolder: t('type_here'),
    })
    if (!text) {
      return
    }
    const info = await withLoading(
      getTranslator({ to: LANGUAGE.CN }).translate(text || ''),
      'Translating to Chinese...'
    )
    const result = await vscode.window.showQuickPick([info], {
      placeHolder: t('choose_translate_result_to_clipboard'),
    })
    if (result) {
      vscode.env.clipboard.writeText(result)
      logger.info(t('clipboard_copied', { text: result }), false)
    }
  } catch (error) {
    logger.error(error)
  }
}

export const ToChineseCommandConfig = {
  command: 'devTranslator.toChinese',
  callback,
}
