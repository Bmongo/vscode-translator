import * as vscode from 'vscode'

export const withLoading = async <T>(
  promise: Promise<T> | (() => Promise<T>),
  message: string = 'Loading...'
): Promise<T> => {
  const loading = vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Window,
      title: message,
      cancellable: false,
    },
    async progress => {
      progress.report({ increment: 0, message })
      if (typeof promise === 'function') {
        promise = promise()
      }
      const result = await promise
      progress.report({ increment: 100 })
      return result
    }
  )
  return loading
}
