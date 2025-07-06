import * as vscode from 'vscode'

const callback = () => {
  vscode.window.showInformationMessage('Hello World from Translator toEnglish openTranslationPanel!')
}

export const OpenPanelCommandConfig = {
  command: 'translator.openTranslationPanel',
  callback,
}
