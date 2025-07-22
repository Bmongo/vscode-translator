# Development Guide

This document provides guidelines for setting up the development environment and developing for the VSCode Dev Translator extension.

## Requirements

- [Node.js](https://nodejs.org/) (recommended to use the version defined in the `.nvmrc` file)
- [pnpm](https://pnpm.io/) (v10.12.4 or higher)
- [Visual Studio Code](https://code.visualstudio.com/)

## Setting Up Development Environment

1. Clone the repository

```bash
git clone https://github.com/Bmongo/vscode-translator.git
cd vscode-translator
```

2. Install dependencies

```bash
pnpm install
```

3. Set up Husky hooks

Husky hooks are automatically set up during dependency installation. If you need to set them up manually, run:

```bash
pnpm prepare
```

## Development Workflow

### Compile and Watch

During development, you can use the following command to compile code and watch for file changes:

```bash
pnpm watch
```

This will run both esbuild and TypeScript in watch mode.

### Build Extension

To build the extension, run:

```bash
pnpm compile
```

To prepare the extension for packaging, run:

```bash
pnpm package
```

### Type Checking

To run type checking only, use:

```bash
pnpm check-types
```

### Code Style Checking and Fixing

To run ESLint and Prettier checks, use:

```bash
pnpm lint
```

### Spell Checking

To check for spelling errors, run:

```bash
pnpm cspell
```

## Testing

### Running Tests

To run tests, use:

```bash
pnpm test
```

To run tests in UI mode, use:

```bash
pnpm test:ui
```

## Debugging the Extension

1. Open the project in VS Code
2. Press `F5` to start a debugging session
3. This will launch the extension in a new VS Code window
4. In the debugging window, you can test extension features and set breakpoints

## Committing Code

This project uses the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit message formatting.

To create a compliant commit, use:

```bash
pnpm commit
```

This will start an interactive commit process that guides you through creating a properly formatted commit message.

## Generating Changelog

To generate or update the changelog, run:

```bash
pnpm changelog
```

## Project Structure

- `src/`: Source code directory
- `dist/`: Build output directory
- `test/`: Test files
- `doc/`: Documentation and images
- `.vscode/`: VS Code configuration files
- `.husky/`: Git hook scripts

## Extension Configuration

Extension configuration is defined in the `contributes.configuration` section of `package.json`. If you need to add new configuration options, add them there.

## Adding New Translation Services

If you want to add a new translation service, refer to the existing translation service implementations (Google and Bing) and ensure the new service implements the same interface.

## Adding New Language Support

To add new language support, you need to:

1. Add the new language in the configuration options in `package.json`
2. Add the corresponding translation logic
3. Add a README file for the new language, if needed

## Issues and Help

If you encounter any problems during development, please check [GitHub Issues](https://github.com/Bmongo/vscode-translator/issues) or create a new issue.
