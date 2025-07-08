import * as vscode from 'vscode'
import { getTranslator } from '@/translators'
import { logger } from '@/utils/logger'
import { withLoading } from '@/utils/loading'

const callback = async () => {
  try {
    const text = await vscode.window.showInputBox({
      prompt: 'Enter text to translate to chinese',
      placeHolder: 'Type here...',
    })
    const info = await withLoading(
      getTranslator({ to: 'zh' }).translate(text || ''),
      'Translating to Chinese...'
    )
    const result = await vscode.window.showQuickPick([info])
    if (result) {
      vscode.env.clipboard.writeText(result)
      logger.info(`Translated text copied to clipboard: ${result}`, false)
    }
  } catch (error) {
    logger.error(error)
  }
}

export const ToChineseCommandConfig = {
  command: 'translator.toChinese',
  callback,
}
