# Working with Git and Github

At Palantir, we use a system called git to revision our source code. If you are making any changes to a client’s code base, you will need to know how to interact with git and Github. While git is the name of the software that we use, Github is a service that allows us to centralize where our git repositories are stored and gives us a UI on top of git that makes it easier to review some types of code changes. This document will give you a very short introduction to git and then introduce you to some of the git and GitHub related practices that we employ.

## Table of Contents

* [Where to Start](#where-to-start)
* [Committing Code](#committing-code)
* [Creating a Pull Request](#creating-a-pull-request)
* [What Happens Next?](#what-happens-next)

## Where to Start

If you have never worked with code revisioning system before, it is very important to understand the role that it plays at an agency. The code repository allows you to store code that is any state in a centralized place. This means that you can share the code with your co-workers or if you go on vacation your co-workers can pick up the code where you left it. It is very important that you commit your code to the repository (or “repo”) on a frequent and regular basis. 

Git also allows us to see the changes to a code base over time. As new changes are introduced to the system we can navigate back in the history and see all the changes to a particular file or set of files. This is very useful when tracking down bugs or trying to understand the scope of a project’s history. 

These are only a few of the reasons to use a code revisioning system. As for the others... your coworkers will gladly share them with you at length, if you ask.

There are many great resources online for getting started with git. Links to some of those resources are provided below. You should familiarize yourself with the provided link before continuing on. 

* [Getting Started - Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
* [GitHub Training Kit](https://training.github.com/kit/)
* [Git Reference](http://gitref.org/)

## Additional Reading

* [Palantir's Git Workflow](workflow.md)
* [Palantir's PR Review Process](pr_review.md)
* [Palantir's Github Labels Usage](github-labels.md)
* [.gitignore](gitignore.md)
* [Tagging](tagging.md)

## Committing Code

Code that has been committed can never be lost. Therefore, it is in your best interest to commit and push your code frequently. Apart from that general principle we do not have a canonized list of rules about making commits. Below are some general guidelines that you can follow and may find helpful.

* Commits titles should refer to the ticket relate to.
* Commit messages should be concise and describe _why_ the proposed changes are being made.
* Generally speaking, you should only push code to your own branch, unless the branch owner is aware that you are going to be making changes to their branch.
* Use best practices for formatting and grammar in your commit messages.
* Use [Smart Commits](https://confluence.atlassian.com/fisheye/using-smart-commits-298976812.html) for tickets that are stored in Jira.

### Example Formatting

Below are some example commit messages that show different scenarios.

#### Work in Progress Save

````
  PRJ-123 Updates half the content types #time 2h 30m
````

#### Completing a Ticket or Feature

When completing a piece of functionality as described in a ticket, you should reference the ticket, and note that this commit completes it (to your understanding); you could also include the user story or requirements in the commit message as well as more details about why the code is being introduced.

````
  PRJ-123 Completes content type updates #time 3h

  User Story:
  As an editor
  I'd like to see the same fields on content types x, y, and z
  So that my workflow is not different

  This reverts all of the above-mentioned content types. Some
  things you may want to know about this:
    - First thing
    - Second thing
````

## Creating a Pull Request

When you have worked on a feature request or bug to the point that you think you're done, you can propose adding your code changes to the system by creating a "Pull Request" (or PR). A PR is a workflow mechanism introduced by Github and is proprietary to Github. It is basically a way of asking that your proposed changes be added to the canonical code base.

The end result of a pull request is that code is either accepted (merged) or rejected. If the code (PR) is merged, then a new commit is created on the branch that the PR was created against.

### Before Submitting a PR

Before you submit a PR, you should do the following:

* Make sure that you've merged in ```develop``` (or whatever the branch of record is).
* Make sure that your code does not cause tests to stop passing.
* Make sure your code is properly formated and linted.
* Make sure that all the requirements (as described in the ticket) are met.
* Make note of the testing procedures so the PR can easily be tested.

### How to Submit a PR

PRs can be created directly on Github's website. To create a PR, first navigate to the branch that has the changes you'd like committed (for example, if you've made commits on the branch "123-new-feature" and would like those changes to appear in the ```develop``` branch). You should see a green button near the top left of the of the screen that says "New pull request".

After clicking that button, you are taken to a screen that will show you the base branch (where the changes will end up) and the branch you're comparing the base to (which is where the changes exist that you want merged). You can create a pull request message on this screen which should:

* Link to the ticket that the PR completes
* Link to or describe in the PR message the testing instructions

For example:

````
  PRJ-123 Revert all features

  This PR will revert the following content types: X, Y, and Z.

  To test:

  * Pull the code
  * Run "drush updb" and "drush fra"
  * Visit content types X, Y, and Z and ensure that the following fields are present: first_name, last_name.
````

Then you simply click the "Create pull request" (green) button and follow your project's CONTRIBUTING guidelines (typically at Palantir that means assigning the PR to the project lead and/or creating a ticket for the PR to be reviewed).

## What Happens Next?

The appropriate person will review your Pull Request (keeping the [PR Review Guidelines](https://github.com/palantirnet/development_documentation/blob/master/guidelines/pr_review.md) in mind). They will likely provide you with feedback which may mean you have to further update your code. Continue making working commits as you were before (the PR will be automatically updated with every additional commit you make to the branch). Once all the feedback has been addressed, the PR will be ready to be re-reviewed.

The PR review process is sometimes compared to the process of going through an art critique. It can feel uncomfortable to have your work closely inspected and critiqued, but it is a valuable process which will, hopefully, help you become better at your job.

If you have never gone through a thorough Pull Request Review, you may want to read the guidelines (linked above) so you know what kind of feedback to expect and why you might be getting the feedback that you are.
