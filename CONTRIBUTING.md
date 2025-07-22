# Contributing Guide

Thank you for considering contributing to the VSCode Dev Translator extension! This document provides guidelines and best practices for the contribution process.

## Code of Conduct

Please read and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

If you find a bug, please create a new issue on [GitHub Issues](https://github.com/Bmongo/vscode-translator/issues) and describe the problem in as much detail as possible, including:

1. A brief description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment information (VS Code version, operating system, etc.)

### Suggesting Features

If you have an idea for a new feature, please create a new issue on [GitHub Issues](https://github.com/Bmongo/vscode-translator/issues) and label it as "enhancement". Please describe your idea in as much detail as possible, including:

1. A brief description of the feature
2. Why this feature would be valuable to users
3. Suggestions for implementation (if any)

### Pull Request Process

1. Before starting work, please check [GitHub Issues](https://github.com/Bmongo/vscode-translator/issues) and existing Pull Requests to ensure no one is already working on the same issue.

2. Fork the repository and clone it locally:

   ```bash
   git clone https://github.com/YOUR-USERNAME/vscode-translator.git
   ```

3. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   or

   ```bash
   git checkout -b fix/your-bug-fix
   ```

4. Make necessary changes, ensuring you follow the code style guidelines.

5. Run tests to ensure all tests pass:

   ```bash
   pnpm test
   ```

6. Commit your changes using a commit message that follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

   ```bash
   pnpm commit
   ```

7. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

8. Create a Pull Request to the original repository's `main` branch.

9. In the Pull Request description, clearly explain your changes and link to any related issues (if applicable).

10. Wait for maintainers to review your Pull Request. Some modifications may be required before it can be accepted.

## Development Guidelines

Please refer to [DEVELOPMENT.md](DEVELOPMENT.md) for detailed information on development setup and workflow.

## Code Style Guidelines

This project uses ESLint and Prettier to enforce code style. Before submitting code, ensure your code complies with these standards:

```bash
pnpm lint
```

### TypeScript Guidelines

- Use type annotations and avoid using the `any` type
- Use interfaces to define object structures
- Use async/await instead of callbacks or Promise chains
- Add appropriate documentation comments for functions and methods

### Testing Guidelines

- Add unit tests for new features
- Ensure all tests pass
- Strive for high test coverage

## Commit Message Guidelines

This project uses the [Conventional Commits](https://www.conventionalcommits.org/) specification. Commit messages should follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

For example:

```
feat(translator): add support for new translation service

Added support for XYZ Translation API, providing more language options.

Closes #123
```

### Using Commitizen

We recommend using [Commitizen](https://github.com/commitizen/cz-cli) to help format commit messages according to our standards. The recommended approach is to install Commitizen globally:

```bash
# Install Commitizen globally
npm install -g commitizen

# Now you can use git cz instead of git commit
git cz
```

This global installation allows you to use `git cz` in any repository that follows the Conventional Commits specification. Alternatively, you can use the project's configured script:

```bash
pnpm commit
```

Both methods will guide you through an interactive process to create a properly formatted commit message.

Common types include:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect code meaning (whitespace, formatting, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Code changes that improve performance
- `test`: Adding or correcting tests
- `chore`: Changes to the build process or auxiliary tools

## Documentation Contributions

Documentation improvements are also valuable contributions. If you find errors or areas for improvement in the documentation, please submit changes following the Pull Request process outlined above.

## Translation Contributions

If you want to add new language support for the extension or improve existing translations, please refer to the "Adding New Language Support" section in [DEVELOPMENT.md](DEVELOPMENT.md).

## License

By contributing your code, you agree that your contributions will be licensed under the project's license. Please see the [LICENSE](LICENSE) file for more information.

## Thank You

Thank you again for your contributions! Your efforts help improve the VSCode Dev Translator extension and make it more useful for all users.
