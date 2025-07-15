import * as vscode from 'vscode'
import webviewContent from './translate-panel.html'
import { getTranslator } from '@/translators'
import { LANGUAGE, LANGUAGE_OPTIONS } from '@/vscode-config'
import { t } from '@/lang'

const callback = () => {
  // 创建 Webview 面板
  const panel = vscode.window.createWebviewPanel(
    'TranslationPanel', // 面板 ID
    t('panel_title'), // 面板标题
    vscode.ViewColumn.Beside, // 显示位置
    { enableScripts: true } // 启用 JavaScript
  )

  // 在 Webview 中加载 HTML 页面
  const htmlString = webviewContent.replace(/{{(.*?)}}/g, (_, p1) => {
    return t(p1)
  })
  panel.webview.html = htmlString

  panel.webview.postMessage({
    type: 'init',
    data: {
      defaultFrom: LANGUAGE.AUTO,
      defaultTo: LANGUAGE.CN,
      originLanguages: LANGUAGE_OPTIONS,
      targetLanguages: LANGUAGE_OPTIONS.filter(({ value }) => value !== LANGUAGE.AUTO),
    },
  })
  // 监听 Webview 发送的消息
  panel.webview.onDidReceiveMessage(async message => {
    if (message.type === 'translate') {
      const { text, from, to } = message.data
      const result = await getTranslator({ from, to }).translate(text)
      panel.webview.postMessage({
        type: 'translate',
        data: result,
      })
    }
  })
}

export const OpenPanelCommandConfig = {
  command: 'devTranslator.openTranslationPanel',
  callback,
}
