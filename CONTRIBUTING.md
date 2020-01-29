[milestone]: https://docs.gitlab.com/ee/user/project/milestones/
[issues]: https://docs.gitlab.com/ee/user/project/issues/
[task list]: https://docs.gitlab.com/ee/user/markdown.html#task-lists
[issue boards]: https://docs.gitlab.com/ee/user/project/issue_board.html
[burndown chart]: https://docs.gitlab.com/ee/user/project/milestones/burndown_charts.html
[CI/CD]: https://docs.gitlab.com/ee/ci/README.html
[label]: https://docs.gitlab.com/ee/user/project/labels.html
[releases]: https://docs.gitlab.com/ee/user/project/releases/
[pages]: https://docs.gitlab.com/ee/user/project/pages/
[assignee]: https://docs.gitlab.com/ee/user/project/issues/multiple_assignees_for_issues.html
[reference]: https://docs.gitlab.com/ee/user/markdown.html#special-gitlab-references
[automatically closing issues]: https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically
[merge request]: https://docs.gitlab.com/ee/user/project/merge_requests/
[due date]: https://docs.gitlab.com/ee/user/project/issues/due_dates.html
[approval]: https://docs.gitlab.com/ee/user/project/merge_requests/merge_request_approvals.html
[time tracking]: https://docs.gitlab.com/ee/workflow/time_tracking.html
[template]: https://docs.gitlab.com/ee/user/project/description_templates.html
[related issues]: https://docs.gitlab.com/ee/user/project/issues/related_issues.html
[Auto DevOps]: https://docs.gitlab.com/ee/topics/autodevops/
[Docker special characters]: https://docs.gitlab.com/ee/user/packages/container_registry/#docker-connection-error

[You don't need loops]: https://github.com/you-dont-need/You-Dont-Need-Loops
[Git - the simple guide]: https://rogerdudler.github.io/git-guide/
[Git reference guide]: https://www.digitalocean.com/community/tutorials/how-to-use-git-a-reference-guide
[Git cheat sheet]: https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet
[Git Tower book]: https://www.git-tower.com/learn/git/ebook/en/command-line/introduction
[Pro Git book]: https://git-scm.com/book/en/v2
[Git best practices]: https://www.git-tower.com/learn/git/ebook/en/command-line/appendix/best-practices
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
[ESlint]: https://eslint.org/
[ESlint-built-in-rules]: https://eslint.org/docs/rules/
[ESlint-plugin-list]: https://www.npmjs.com/search?q=eslint-plugin
[Yarn usage]: https://yarnpkg.com/en/docs/usage
[NPM]: https://www.npmjs.com/
[DefinitelyTyped]: https://github.com/DefinitelyTyped/DefinitelyTyped

# Contributing Guide

## Software Development Workflow

> [GitLab as an Agile tool](https://about.gitlab.com/solutions/agile-delivery/)

Here's one idea of how we can use GitLab to facilitate our software development workflow:

- Client meetings:

  1. Collect user stories from client
  1. Create individual GitLab [issues] for each user story
  1. Categorize [issues] using [labels]
  1. Discuss each user story using issue comments
  1. Brainstorm tasks required to complete the user story and create a new issue for each task
     using the `Task` [template].
     (From here on out, these issues will be called "task issues" to differentiate from "user story issues")
  1. For each user story, add its task issues as [related issues]

- Long-term planning:

  1. Create a GitLab [milestone] for each large-scale goal with proper start and end dates
  1. Assign relevant user story issues and task issues to the [milestone]

- Start of sprint:

  1. Organize issues using GitLab [issue boards] using To Do, In Progress, Testing, Finished columns
  1. For user stories in the current sprint's backlog, move them to the "To Do" column.
     These indicate the user stories that we are trying to accomplish during the sprint,
     but may not finish
  1. Move tasks required for user story into the "To Do" column.
     These indicate specific tasks for the user stories that we are committed to finishing by the end of the sprint
  1. For all task issues,
     assign it a [due date] for the end of the sprint
     and add a `Sprint::NUMBER` [label] to it
  1. Divide up tasks.
     When someone decides to tackle a user story or a task, list him as a [assignee] to the GitLab issue

- During a sprint:

  1. Create a branch for each task in the following format to [reference its respective task issue](https://stackoverflow.com/a/43297769):
     `XX-brief-description`, where `XX` is the issue number
  1. Make changes and commit along the way, following [Git best practices]
  1. Move issues to different columns of the [issue boards] as work is done
  1. Keep track of time spent on each task issue using GitLab [time tracking]
  1. When work is done, create a [merge request] using the `Complete Task` [template]
     and reference the relevant task [issues] in the issue description
     so that they will be [closed automatically on merge][automatically closing issues]
     (Example: write "Closes #ISSUE_NUMBER")
  1. Other team members review the merge request and give their [approval]
  1. Merge the merge request once there is consensus among the team
  1. Close its user story issue once the entire user story is implemented

- During stand-ups:

  - Review the milestone's [burndown chart]
  - Review sprint [issue boards]
  - Review "activity" (`$REPO_URL/activity`)

- End of sprint:

  1. Look at open issues with the `Sprint::NUMBER` [label]
  1. For late task issues, keep the original due date (do not adjust due date for next sprint)

In addition to workflow, we can use GitLab [CI/CD] to automate common tasks such as:

- Linting code
- Testing code
- Making production builds of code
- Deploying production build to client using GitLab [releases] or [pages]

All of this can be done automatically with little configuration using GitLab [Auto DevOps]

- **Note:**
  Since [Auto DevOps] is Docker-based, the repo owner, repo name, and branch names
  should not contain any of the following special characters ([more info][Docker special characters]) or the pipeline will fail:

  - Leading underscore (Regex: `^_`)
  - Trailing dash (Regex: `-$`)
  - Double dash (Regex: `.*--.*`)

## Setting up development environment

> See the 'Reference material' section for information on how to use Git

1. Install a Git client: [command-line][Git command-line], [GitHub Desktop], etc.

  - If you are not familiar with the [Git command-line], I highly recommend using [GitHub Desktop].
    You do not need to sign into a GitHub account to use it (though it will not hurt either),
    since we are using GitLab instead of GitHub.

1. Install [Node.js]
1. If not already included in your Node.js installation, install [Yarn]
1. Clone this repo using Git
1. Tell Git to use Unix-like line endings:

  ```bash
  git config core.autoCrlf input
  git checkout -- .
  ```

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

Note:
Your development environment will automatically run `yarn install` after a Git pull or checkout
if new dependencies are added in order to keep your local installation up-to-date.
If you would like to opt out of this behavior,
set the `YARNHOOK_DRYRUN` environment variable to `true` in your shell.
E.g.:

```bash
# In ~/.bashrc
export YARNHOOK_DRYRUN=true
```

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

These commands will run across all packages in the repo.
To run them in only a specific package,
first `cd` into `packages/[PACKNAME-NAME]/`
then run the relevant `yarn SCRIPT` command

## Debugging lint errors

When [ESlint] analyzes source code, it does so on the basis of pre-determined rules.
It comes with an extensive list of [built-in rules][ESlint-built-in-rules]
but it is also flexible to accommodate third-party rules
through various [plugins][ESlint-plugin-list].

If you get a lint error,
take note of the rule which is producing the error.
If the rule contains a `/` then it is produced by a plugin where `plugin-name/` is the rule prefix.
If it does not contain a `/` then it is a built-in rule.

When rules are not automatically fixable with `yarn lint --fix`,
it can be helpful to look at the rule's documentation.
If the error is due to a built-in rule, read its documentation [here][ESlint-built-in-rules].
If the rule is from a plugin,
first find its appropriate package on [NPM][ESlint-plugin-list],
then search for the rule name in the `README`,
(almost all good plugins will have references to each rule's documentation in the `README`,
which will contain several example snippets of 'valid' and 'invalid' code)

## Adding/upgrading/removing dependencies

> See the [Yarn usage] guide
>
> See [NPM] for the list of available packages

Node.js differentiates between different kinds of dependencies:
`dependencies`, `devDependencies`, and some others (see [here](https://stackoverflow.com/a/22004559) for full guide).
`dependencies` are those that are used at run-time whereas `devDependencies` are those that are only used at compile-time.

```bash
cd miami-university-senior-capstone-project/

# First, go into the proper package
cd packages/PACKNAME_NAME/

# Add dependency
yarn add package-name

# Add dev dependency
yarn add package-name --dev

# Commit package.json and yarn.lock
git add package.json ../../yarn.lock
git commit -m "Add 'package-name'"
```

Since we're using TypeScript,
we need type declarations for all our dependencies.
If the dependency does not maintain a declaration file itself,
then you will also need to install its community-maintained declaration file from [DefinitelyTyped]:

```bash
yarn add @types/package-name --dev
```

If the dependency is a `devDependency`
and is not specific to any package in particular, but rather to the project as a whole (such as linters, Git hooks, etc.),
then the package should be added to the whole workspace:

```bash
cd miami-university-senior-capstone-project/

# Add workspace dev dependency
yarn add package-name --dev -W

# Commit package.json and yarn.lock
git add package.json yarn.lock
git commit -m "Add 'package-name'"
```

# Reference material

- Programming guidelines:

  - [You don't need loops] article

- Git

  - [Quick-start guide][Git - the simple guide]
  - [Command-line reference][Git reference guide]
  - [Cheat sheet][Git cheat sheet]
  - [Book for beginners][Git Tower book]
  - [Book for intermediates][Pro Git book]
  - [Best practices][Git best practices]
  - Tip: Use `git add -p` to make fine-grained commits.
    It asks you which portions of your changes you want to add.
    This is useful when you have multiple changes in the same file that ought to be committed separately.

- Pair programming in modern IDEs:
  [vscode](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare),
  [Atom](https://teletype.atom.io/)
- Promises:
  [MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises),
  [API details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- Debugging JavaScript running in Chrome:
  [Using vscode](https://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code),
  [Using WebStorm](https://www.jetbrains.com/help/webstorm/debugging-javascript-in-chrome.html)
