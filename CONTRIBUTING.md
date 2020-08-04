# How to contribute to this project

>This document is a work in progress

## Coding rules

### Branch and commit naming

#### Action words

Action words will be used in branch and commit naming, there are as follow :

* **feat**: A new feature
* **fix**: A bug fix
* docs: Documentation only changes
* style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* refactor: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* test: Adding missing or correcting existing tests
* chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Branch naming

Every branch must be named following this pattern :

`{action}/{branch purpose}`

> Example : feat/add-user-selection

#### Commit naming

Every commit must be named following this pattern :

`{action}({subject}): {message}`

> Example : feat(package.json): Update React version