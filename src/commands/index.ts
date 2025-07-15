import * as vscode from 'vscode'
import { OpenPanelCommandConfig } from './open-panel'
import { ToEnglishCommandConfig } from './to-english'
import { ToChineseCommandConfig } from './to-chinese'
import { ToOtherLanguageCommandConfig } from './to-other-language'

export const registerCommands = (context: vscode.ExtensionContext) => {
  const disposables = [
    OpenPanelCommandConfig,
    ToEnglishCommandConfig,
    ToChineseCommandConfig,
    ToOtherLanguageCommandConfig,
  ].map(commandConfig => vscode.commands.registerCommand(commandConfig.command, commandConfig.callback))
  context.subscriptions.push(...disposables)
}
