import * as vscode from 'vscode'
import { registerCommands } from './commands'
import { registerHover } from './hover'

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context)
  registerHover(context)
}
