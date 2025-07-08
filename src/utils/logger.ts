import * as vscode from 'vscode'

export const logger = {
  info: (message: string, mute = true) => {
    console.info(`[TRANSLATOR INFO] ${message}`)
    if (!mute) {
      vscode.window.showInformationMessage(message)
    }
  },
  error: (message: any, mute = false) => {
    let msg = ''
    if (typeof message === 'string') {
      msg = message
    } else {
      msg = message?.message || message?.toString() || 'Unknown error'
    }
    console.error(`[TRANSLATOR ERROR] ${message}`)
    if (!mute) {
      vscode.window.showErrorMessage(msg)
    }
  },
}
