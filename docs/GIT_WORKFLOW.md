# Git Workflow Guide

## Repository Overview
This repository contains the Jain Genius website source code. It uses Git for version control and follows a standard GitHub flow for collaboration.

## Branching Strategy

### Main Branches
- **main**: Production-ready code. This branch reflects what is currently deployed to the live website.
- **feature/***: Feature development branches. All new work should start from and target these branches.

### Branch Naming Conventions
- `feature/description-of-work` - For new features (e.g., `feature/admin-dashboard-improvements`)
- `fix/description-of-fix` - For bug fixes (e.g., `fix/login-issue-mobile`)
- `docs/description` - For documentation changes (e.g., `docs/api-reference-update`)
- `refactor/description` - For code refactoring (e.g., `refactor/component-organization`)

## Standard Workflow

### 1. Starting New Work
```bash
# Update main branch
git checkout main
git pull origin main

# Create and switch to new feature branch
git checkout -b feature/your-feature-name
```

### 2. Making Changes
- Make your changes to the codebase
- Commit frequently with descriptive messages
- Test your changes locally before pushing

### 3. Committing Changes
```bash
# Stage your changes
git add .

# Commit with a clear message
git commit -m "Describe what this change accomplishes"

# Example good commit messages:
# "Add admin live edit mode toggle button"
# "Fix mobile navigation menu overflow issue"
# "Update French translations for events section"
# "Refactor CMS store event handling logic"
```

### 4. Sharing Your Work
```bash
# Push your branch to GitHub
git push -u origin feature/your-feature-name

# Create a Pull Request on GitHub
# 1. Go to https://github.com/your-username/jain-genius-website
# 2. Click "Compare & pull request" or navigate to Pull Requests → New Pull Request
# 3. Select your feature branch
# 4. Add description and request review
```

### 5. Updating Your Branch
While working on a feature branch, periodically update with changes from main:
```bash
# Fetch latest changes
git fetch origin

# Rebase your feature branch onto updated main
git checkout feature/your-feature-name
git rebase origin/main

# Resolve any conflicts if they occur
# Then continue: git rebase --continue
```

### 6. After Pull Request Approval
Once your pull request is approved and merged:
```bash
# Switch to main branch
git checkout main

# Pull the latest changes (including your merged work)
git pull origin main

# Delete your feature branch (optional but recommended)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

## Commit Message Guidelines

### Format
```
type: brief description (50 chars or less)

[optional detailed explanation]
[optional footer for issue references]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Formatting, missing semicolons, etc. (no code changes)
- **refactor**: Code restructuring (no functional changes)
- **test**: Adding or correcting tests
- **chore**: Maintenance tasks, build process changes

### Examples
```
feat: add live edit mode toggle to admin dashboard

Added a button in the AdminLiveBar component that allows administrators
to toggle live edit mode on and off without visiting the admin dashboard.

fix: resolve mobile navigation menu overlap issue

Fixed z-index issue causing mobile navigation menu to appear behind
header content on iOS devices. Adjusted positioning and stacking context.

docs: update environment variable documentation

Clarified which environment variables are required for local development
vs production deployment in LOCAL_SETUP.md and ENVIRONMENT_VARIABLES.md.
```

## Pull Request Best Practices

### Before Creating a PR
1. Ensure your code builds successfully: `bun run build`
2. Check for TypeScript errors: `bun run lint`
3. Test your changes manually in local development
4. Make sure your commits are clean and well-described

### PR Description Should Include
- **What**: What changes were made
- **Why**: Reason for the changes (problem being solved)
- **How**: How to test the changes
- **Screenshots**: For UI changes, include before/after screenshots if helpful
- **Checklist**: List of items verified (testing, responsive design, etc.)

### Review Process
1. Team members will review your code for correctness, style, and completeness
2. Address any review comments by making additional commits
3. Once approved, a maintainer will merge your PR
4. Your branch will be automatically deleted if you enabled the option

## Reverting Changes

### If You Need to Undo Recent Changes
```bash
# Unstage a file while keeping changes
git restore --staged file.txt

# Discard uncommitted changes in a file
git restore file.txt

# Undo the last commit but keep changes staged
git reset --soft HEAD~1

# Undo the last commit and discard changes
git reset --hard HEAD~1
```

### If You Need to Revert a Published Commit
```bash
# Create a new commit that reverses the changes
git revert <commit-hash>

# This is preferred for public history as it doesn't rewrite history
```

## Working with Tags (for Releases)
```bash
# List existing tags
git tag

# Create a new version tag (typically done by maintainers)
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin v1.2.0
```

## Common Git Commands Reference

### Checking Status
```bash
git status        # See what's changed
git log           # View commit history
git log --oneline # Brief commit history
git diff          # See exact changes not yet staged
git diff --staged # See changes staged for commit
```

### Branching
```bash
git branch              # List local branches
git branch -r           # List remote branches
git checkout branch     # Switch to existing branch
git checkout -b branch  # Create and switch to new branch
```

### Syncing with Remote
```bash
git fetch               # Download latest from remote
git pull                # Fetch and merge remote changes
git push                # Push local changes to remote
```

## Repository Rules

### What Goes in `.gitignore`
- Node modules (`node_modules/`)
- Build outputs (`dist/`)
- Environment files (`.env`)
- OS-specific files (`.DS_Store`, `Thumbs.db`)
- IDE files (`.vscode/`, `*.iml`)
- Logs and temporary files

### What Should Never Be Committed
- Secret API keys, passwords, or tokens
- Personal access credentials
- Environment files with real values (.env)
- Build artifacts that can be regenerated
- Large binary files not needed for source

## Getting Help
- Git documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Interactive Git tutorial: https://learngitbranching.js.org/