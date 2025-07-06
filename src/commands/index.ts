import * as vscode from 'vscode'
import { OpenPanelCommandConfig } from './open-panel'
import { ToEnglishCommandConfig } from './to-english'
import { ToChineseCommandConfig } from './to-chinese'

export const registerCommands = (context: vscode.ExtensionContext) => {
  const disposables = [OpenPanelCommandConfig, ToEnglishCommandConfig, ToChineseCommandConfig].map(
    commandConfig => vscode.commands.registerCommand(commandConfig.command, commandConfig.callback)
  )
  context.subscriptions.push(...disposables)
}
