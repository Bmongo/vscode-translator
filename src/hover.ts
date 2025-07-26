import * as vscode from 'vscode'
import { getTranslator } from './translators'
import { logger } from './utils/logger'
import { detectTextLanguage } from './utils/lang'
import { getAllExtensionConfig, LANGUAGE } from './vscode-config'
import { t } from './lang'

const getTargetLangType = (text: string) => {
  const { from, to } = getAllExtensionConfig()
  const textType = detectTextLanguage(text)
  let targetType = to
  if (textType === to && from !== LANGUAGE.AUTO) {
    targetType = from
  }
  return targetType
}

export const registerHover = (context: vscode.ExtensionContext) => {
  const p = vscode.languages.registerHoverProvider('*', {
    async provideHover(document, position) {
      const word = document.getText(document.getWordRangeAtPosition(position))
      if (!word) {
        return
      }
      const selectedPosition = vscode.window.activeTextEditor?.selection
      const selectText = vscode.window.activeTextEditor?.document.getText(selectedPosition)
      let needTranslate = selectText || word
      if (
        selectedPosition &&
        !(position.isBeforeOrEqual(selectedPosition.end) && position.isAfterOrEqual(selectedPosition.start))
      ) {
        // 鼠标位置在选中文本之外
        needTranslate = word
      }
      const targetType = getTargetLangType(needTranslate)
      try {
        const result = await getTranslator({ from: LANGUAGE.AUTO, to: targetType }).translate(needTranslate)
        if (result) {
          logger.info(`Hover translation result: ${result}, to: ${targetType}`)
          const showMsgs = new vscode.MarkdownString()
          showMsgs.appendMarkdown(`**${t('translation_result_text')}**`)
          showMsgs.appendText('\n')
          showMsgs.appendMarkdown(result)
          showMsgs.appendText('\n')
          showMsgs.appendMarkdown(`**${t('untranslated_text')}**`)
          showMsgs.appendText('\n')
          showMsgs.appendMarkdown(needTranslate)
          return new vscode.Hover(showMsgs)
        }
      } catch (e: any) {
        const msg = typeof e === 'string' ? e : e?.message
        logger.error(`Hover translation error: ${msg}`, true)
        return new vscode.Hover(msg)
      }
    },
  })
  context.subscriptions.push(p)
}
