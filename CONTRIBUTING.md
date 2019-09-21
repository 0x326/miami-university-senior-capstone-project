[milestone]: https://docs.gitlab.com/ee/user/project/milestones/
[issues]: https://docs.gitlab.com/ee/user/project/issues/
[task lists]: https://docs.gitlab.com/ee/user/markdown.html#task-lists
[issue boards]: https://docs.gitlab.com/ee/user/project/issue_board.html
[burndown chart]: https://docs.gitlab.com/ee/user/project/milestones/burndown_charts.html
[CI/CD]: https://docs.gitlab.com/ee/ci/README.html
[labels]: https://docs.gitlab.com/ee/user/project/labels.html
[releases]: https://docs.gitlab.com/ee/user/project/releases/
[pages]: https://docs.gitlab.com/ee/user/project/pages/
[assignee]: https://docs.gitlab.com/ee/user/project/issues/multiple_assignees_for_issues.html

[Git - the simple guide]: https://rogerdudler.github.io/git-guide/
[Git reference guide]: https://www.digitalocean.com/community/tutorials/how-to-use-git-a-reference-guide
[Git command-line]: https://git-scm.com/downloads
[GitHub Desktop]: https://desktop.github.com/
[Node.js]: https://nodejs.org/en/download/package-manager/
[Yarn]: https://yarnpkg.com/en/docs/install
[Jetbrains WebStorm]: https://www.jetbrains.com/webstorm/
[Visual Studio Code]: https://code.visualstudio.com/
[Atom]: https://atom.io/
[EditorConfig]: https://editorconfig.org/#download
[React Development Tools - Chrome]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[React Development Tools - Firefox]: https://addons.mozilla.org/en-US/firefox/addon/react-devtools/
[Debugger for Chrome]: https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome

# Contributing Guide

## Software Development Workflow

> [GitLab as an Agile tool](https://about.gitlab.com/solutions/agile-delivery/)

Here's one idea of how we can use GitLab to facilitate our software development workflow:

- Client meetings:

  1. Collect user stories from client
  1. Create individual GitLab [issues] for each user story
  1. Categorize [issues] using [labels]
  1. Discuss each user story using issue comments
  1. Brainstorm tasks required to complete the user story and keep track of them in the issue description using [task lists]

- Start of sprint:

  1. For each sprint, create a GitLab [milestone] with proper start and end dates
  1. For user stories in the current sprint's backlog, assign their respective GitLab [issues] to the [milestone]
  1. When someone decides to tackle a user story, list him as a [assignee] to the GitLab issue

- During a sprint:

  1. Organize issues using GitLab [issue boards] using Not Started, In Progress, Testing, Finished columns
  1. Move issues to different columns as work is done
  1. For each issue, click to check-off [task lists] once each item is complete
  1. Close issue once user story is implemented

- During stand-ups:

  - Review the milestone's [burndown chart]
  - Review sprint [issue boards]
  - Review "activity" (`$REPO_URL/activity`)

- End of sprint:

  1. At the end of a sprint, close the [milestone]

In addition to workflow, we can use GitLab [CI/CD] to automate common tasks such as:

- Linting code
- Testing code
- Making production builds of code
- Deploying production build to client using GitLab [releases] or [pages]

## Setting up development environment

> [Git quick-start guide][Git - the simple guide]
>
> [Git command-line reference][Git reference guide]

1. Install a Git client: [command-line][Git command-line], [GitHub Desktop], etc.
1. Install [Node.js]
1. If not already included in your Node.js installation, install [Yarn]
1. Clone this repo using Git
1. Install dev dependencies:

  ```bash
  cd miami-university-senior-capstone-project/
  yarn install
  ```

1. Install text editor/IDE with TypeScript support.
   Examples: [Jetbrains WebStorm], [Visual Studio Code], [Atom] (with plugin)

    1. Install the [EditorConfig] plugin for your IDE

    1. If using [Visual Studio Code], install the [Debugger for Chrome] extension

1. Install the React Developer Tools extension for your web browser.
   ([Chrome plugin][React Development Tools - Chrome];
   [Firefox plugin][React Development Tools - Firefox])

## Using development environment

```bash
cd miami-university-senior-capstone-project/

# Running app in development mode
yarn start

# Testing codebase
yarn test

# Linting codebase
yarn lint

# Automatically fix lint errors
yarn lint --fix

# Create production build
yarn build

# Analyze size of the production build
yarn analyze-build
```

## Configuring development environment

See https://create-react-app.dev
