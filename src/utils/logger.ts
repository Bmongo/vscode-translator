import * as vscode from 'vscode'

export const logger = {
  info: (message: string) => {
    console.info(`[TRANSLATOR INFO] ${message}`)
    vscode.window.showInformationMessage(message)
  },
  error: (message: any) => {
    let msg = ''
    if (typeof message === 'string') {
      msg = message
    } else {
      msg = message?.message || message?.toString() || 'Unknown error'
    }
    console.error(`[TRANSLATOR ERROR] ${message}`)
    vscode.window.showErrorMessage(msg)
  },
}
