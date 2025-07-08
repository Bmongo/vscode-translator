import * as vscode from 'vscode'
import { getTranslator } from '@/translators'
import { logger } from '@/utils/logger'
import { transformVarString } from '@/utils/transform'
import { withLoading } from '@/utils/loading'

const callback = async () => {
  try {
    const text = await vscode.window.showInputBox({
      prompt: 'Enter text to translate to english',
      placeHolder: 'Type here...',
    })
    const info = await withLoading(
      getTranslator({ to: 'en' }).translate(text || ''),
      'Translating to English...'
    )
    const result = await vscode.window.showQuickPick([info, ...transformVarString(info)])
    if (result) {
      vscode.env.clipboard.writeText(result)
      logger.info(`Translated text copied to clipboard: ${result}`, false)
    }
  } catch (error) {
    logger.error(error)
  }
}

export const ToEnglishCommandConfig = {
  command: 'translator.toEnglish',
  callback,
}
