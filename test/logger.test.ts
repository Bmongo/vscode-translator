import { describe, it, expect, vi } from 'vitest'
import * as vscode from 'vscode'
import { logger } from '../src/utils/logger'

describe('logger', () => {
  it('logs info and does not show message when muted', () => {
    const consoleInfoSpy = vi.spyOn(console, 'info')
    const showInformationMessageSpy = vi.spyOn(vscode.window, 'showInformationMessage')

    logger.info('test info message', true)

    expect(consoleInfoSpy).toHaveBeenCalledWith('[TRANSLATOR INFO] test info message')
    expect(showInformationMessageSpy).not.toHaveBeenCalled()

    consoleInfoSpy.mockRestore()
    showInformationMessageSpy.mockRestore()
  })

  it('logs info and shows message when not muted', () => {
    const consoleInfoSpy = vi.spyOn(console, 'info')
    const showInformationMessageSpy = vi.spyOn(vscode.window, 'showInformationMessage')

    logger.info('test info message', false)

    expect(consoleInfoSpy).toHaveBeenCalledWith('[TRANSLATOR INFO] test info message')
    expect(showInformationMessageSpy).toHaveBeenCalledWith('test info message')

    consoleInfoSpy.mockRestore()
    showInformationMessageSpy.mockRestore()
  })

  it('logs error and does not show message when muted', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error')
    const showErrorMessageSpy = vi.spyOn(vscode.window, 'showErrorMessage')

    logger.error('test error message', true)

    expect(consoleErrorSpy).toHaveBeenCalledWith('[TRANSLATOR ERROR] test error message')
    expect(showErrorMessageSpy).not.toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
    showErrorMessageSpy.mockRestore()
  })

  it('logs error and shows message when not muted', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error')
    const showErrorMessageSpy = vi.spyOn(vscode.window, 'showErrorMessage')

    logger.error('test error message', false)

    expect(consoleErrorSpy).toHaveBeenCalledWith('[TRANSLATOR ERROR] test error message')
    expect(showErrorMessageSpy).toHaveBeenCalledWith('test error message')

    consoleErrorSpy.mockRestore()
    showErrorMessageSpy.mockRestore()
  })

  it('handles error messages that are not strings', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error')
    const showErrorMessageSpy = vi.spyOn(vscode.window, 'showErrorMessage')

    logger.error(new Error('error object'), false)
    expect(consoleErrorSpy).toHaveBeenCalledWith('[TRANSLATOR ERROR] Error: error object')
    expect(showErrorMessageSpy).toHaveBeenCalledWith('error object')

    logger.error(123, false)
    expect(consoleErrorSpy).toHaveBeenCalledWith('[TRANSLATOR ERROR] 123')
    expect(showErrorMessageSpy).toHaveBeenCalledWith('123')

    logger.error(null, false)
    expect(consoleErrorSpy).toHaveBeenCalledWith('[TRANSLATOR ERROR] null')
    expect(showErrorMessageSpy).toHaveBeenCalledWith('Unknown error')

    consoleErrorSpy.mockRestore()
    showErrorMessageSpy.mockRestore()
  })
})
