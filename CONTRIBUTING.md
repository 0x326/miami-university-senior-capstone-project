[milestone]: https://docs.gitlab.com/ee/user/project/milestones/
[issues]: https://docs.gitlab.com/ee/user/project/issues/
[task lists]: https://docs.gitlab.com/ee/user/markdown.html#task-lists
[issue boards]: https://docs.gitlab.com/ee/user/project/issue_board.html
[burndown chart]: https://docs.gitlab.com/ee/user/project/milestones/burndown_charts.html
[CI/CD]: https://docs.gitlab.com/ee/ci/README.html
[labels]: https://docs.gitlab.com/ee/user/project/labels.html
[releases]: https://docs.gitlab.com/ee/user/project/releases/
[pages]: https://docs.gitlab.com/ee/user/project/pages/

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
