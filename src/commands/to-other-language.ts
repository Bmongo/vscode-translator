import * as vscode from 'vscode'
import { getTranslator } from '@/translators'
import { logger } from '@/utils/logger'
import { withLoading } from '@/utils/loading'
import { LANGUAGE } from '@/vscode-config'
import { t } from '@/lang'

const callback = async () => {
  try {
    const to = (await vscode.window.showQuickPick(
      Object.values(LANGUAGE).filter(item => item !== LANGUAGE.AUTO),
      { placeHolder: t('choose_target_language_to_be_translated_into') }
    )) as LANGUAGE
    if (!to) {
      return
    }

    const text = await vscode.window.showInputBox({
      prompt: t('input_text_to_translate'),
      placeHolder: t('type_here'),
    })
    if (!text) {
      return
    }
    const info = await withLoading(getTranslator({ to }).translate(text || ''), 'Translating to ' + to)
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

export const ToOtherLanguageCommandConfig = {
  command: 'devTranslator.toOtherLanguage',
  callback,
}
