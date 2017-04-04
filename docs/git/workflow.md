# Git workflow

## Introduction

Our git workflow is designed to ensure testing of deployed code, provide history of the project, and clearly identify the current release of the code. By following this standard workflow, everyone on the team can look at a project and understand where to contribute. These practices are based on on GitFlow, which is described by Vincent Dreissen in this blog post: http://nvie.com/posts/a-successful-git-branching-model/.

## Branching structure

There are four types of branches:

* **master** is always the deployed production version of code.
* **develop** is the active development branch, from which feature branches are created.
* **feature branches** are used for discreet development tasks and branch from develop.
* **hotfix branches** are discouraged and used only to address critical bugs that prevent deployment. They branch from master and must be merged to develop after release.

![GitFlow branching model diagram](images/git_workflow-branching_diagram.png)

## Setting up a project

When setting up a project in GitHub, the `master` branch is created by default. You should then:

* Update the README.md file and push your changes
* Create a `develop` branch
* Set the default branch to develop

## Working on a project

All development should be done in feature branches; this means that no code commits should be made to **develop** or **master**.

Since we are a distributed team, it is critical that everyone have access to the code. In practice this means that all code is pushed to origin--local feature branches should not be used.

To create a feature branch:
* Checkout the latest work on develop: `git checkout develop; git pull`
* Create and checkout a new branch, naming it by ticket number: `git checkout -b 1234-video-player`
* Push the new branch to origin: `git push -u origin 1234-video-player`
* As you work, push your commits upstream: `git push`

Feature branch names should include a ticket number and 1-3 words to identify the functionality.

### Project-specific workflows

These workflows are not part of our basic process, but may be useful to some teams.

#### Collaborating on feature branches

Developers may collaborate on feature branches, where appropriate, and it is an acceptable workflow to create a feature branch off of another existing feature branch, if task and code organization encourages that workflow. In this case, it is critical to review this decision with the team so that both the sub-branches and the larger feature branch can be reviewed and merged into develop on the same release schedule as the rest of the project. Though subtask branches can be helpful in your workflow, keeping too many subtask branches at once can present challenges with tracking and merging these branches.

#### Rebasing before merge

Some projects may choose to rebase feature branches onto **develop** before merging. This has two major benefits:

* The git history is cleaner and easier to review
* Conflicts get addressed in the commit that causes them, rather than as part of a later merge commit

Pull requests should still be merged using GitHub's "merge" button, which always creates merge commits, since these merge commits record when and by whom the work was reviewed.

If more than one person is committing to a branch, this workflow should be avoided. This workflow will not be fun for developers who are not extremely comfortable with git.

## Pull requests

When a feature branch is ready for testing or review, file a pull request on GitHub to have the code merged to the develop branch.  Then update the status of the corresponding ticket, and request a lead or peer review of the work in the pull request.  Continue to make changes and push to the feature branch until the code passes review.  The pull request will continue to update while you push more code to it.  When ready, the pull request should be merged by the reviewer. Once the pull request has been merged, the feature branch should be deleted.

## Managing releases

All code releases should be tagged according to the [git tagging guidelines](git_tagging.md). In general, releases will be cut directly from the `master` branch. If significant or disruptive work is happening in parallel with incremental releases, then a project should use release and hotfix branches.
