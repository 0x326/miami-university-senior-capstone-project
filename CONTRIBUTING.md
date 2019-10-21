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
  1. Brainstorm tasks required to complete the user story and create a new issue for each task.
     (From here on out, these issues will be called "task issues" to differentiate from "user story issues")
  1. In the issue description for each user story, [reference] its task issues in a list

- Long-term planning:

  1. Create a GitLab [milestone] for each large-scale goal with proper start and end dates
  1. Assign relevant user story issues and task issues to the [milestone]

- Start of sprint:

  1. Organize issues using GitLab [issue boards] using To Do, In Progress, Testing, Finished columns
  1. For user stories in the current sprint's backlog, move them to the "To Do" column.
     These indicate the user stories that we are trying to accomplish during the sprint,
     but may not finish
  1. Move tasks required for user story into the "To Do" column.
     These indicate specific tasks for the user stories that we can committed to finishing by the end of the sprint
  1. For all task issues,
     assign it a [due date] for the end of the sprint
     and add a `Sprint::NUMBER` [label] to it
  1. Divide up tasks.
     When someone decides to tackle a user story or a task, list him as a [assignee] to the GitLab issue

- During a sprint:

  1. Move issues to different columns of the [issue boards] as work is done
  1. Keep track of time spent on each task issue using GitLab [time tracking]
  1. When work is done, create a [merge request]
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

These commands will run across all packages in the repo.
To run them in only a specific package,
first `cd` into `packages/[PACKNAME-NAME]/`
then run the relevant `yarn SCRIPT` command

## Configuring development environment

See https://create-react-app.dev
