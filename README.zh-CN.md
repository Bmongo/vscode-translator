# Vscode 翻译插件

用于日常开发中的各种需要翻译的场景

[English Document](./README.md) | [தமிழ் ஆவணம்](./README.ta.md)

![Licence](https://img.shields.io/github/license/intellism/vscode-comment-translate.svg)

## 简介

在开发过程中，我们经常需要翻译一些单词，或者翻译一些代码片段和注释，特别是开源项目中，存在很多英语注释，经常需要去寻找翻译工具进行翻译，这个插件就是为了解决这个问题的，本插件支持 Google 、 Bing 翻译服务（后续会拓展其他服务）

![Introduction](./doc/images/features.gif)

## 功能

### 悬浮翻译

- 当你悬浮（不需要选中单词）到单词上时，会显示翻译结果和原文

- 当你选中单词时，会显示翻译结果和原文

![HoverWord](./doc/images/hover_word.gif)

### 转换成英文

通过 `translator.toEnglish` 命令触发转英文

- 输入中文后按回车将对应内容转换为英文
- 结果不仅包含翻译的内容，还会将翻译内容转换为相关的英文变量，包括大小驼峰、下划线、中划线变量，可以选中相关内容，按回车后负值内容

![ChineseToEnglish](./doc/images/chinese_to_english.gif)

### 转换成中文

通过 `translator.toChinese` 命令触发转中文

- 输入英文后按回车将对应内容转换为中文

![EnglishToChinese](./doc/images/english_to_chinese.gif)

### 翻译面板翻译

通过 `translator.openTranslationPanel` 命令打开翻译面板

- 在该页面中可以选择指定翻译语种，点击翻译后触发翻译

![OpenPanel](./doc/images/open_panel.gif)

## 配置项

`translator.translator`: 翻译服务，可选择 Google 或者 Bing

`translator.from`: 翻译源语言

`translator.to`: 翻译目标语言

`translator.language`: 默认为当前vscode的语言，该配置会影响插件的交互语言

## 支持语言

- 简体中文
- 英语
- 泰米尔语

## 支持

如果这个插件对您有帮助，可以通过以下方式支持我们：

- 在 Github 中给个小星星 [Bmongo/vscode-translator](https://github.com/Bmongo/vscode-translator)
- 向我们反馈遇到的问题或者建议
- 向网友/朋友推荐这个插件
