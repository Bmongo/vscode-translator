import * as vscode from 'vscode'
import { getTranslator } from '@/translators'
import { logger } from '@/utils/logger'
import { transformVarString } from '@/utils/transform'
import { withLoading } from '@/utils/loading'
import { LANGUAGE } from '@/vscode-config'
import { t } from '@/lang'

const callback = async () => {
  try {
    const text = await vscode.window.showInputBox({
      prompt: t('input_translate_to_english_prompt'),
      placeHolder: t('type_here'),
    })
    if (!text) {
      return
    }
    const info = await withLoading(
      getTranslator({ to: LANGUAGE.EN }).translate(text || ''),
      'Translating to English...'
    )
    const result = await vscode.window.showQuickPick([info, ...transformVarString(info)], {
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

export const ToEnglishCommandConfig = {
  command: 'translator.toEnglish',
  callback,
}
