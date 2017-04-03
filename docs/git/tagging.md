# Tagging releases

## Create annotated tags on the master branch.

When a release branch is merged to master for release or deployment, a release tag should be cut on the master branch. Release tags should only be made against the master branch.

All tags should be created using `git tag -a`. The `-a` flag adds metadata to the tag including the date, tag creator, and a message. For the message, provide a short description of the work completed during the sprint. GitHub displays this information under the project's "Releases" section.

## Use semantic versioning.

Tags should use semantic versioning like X.Y.Z, where:

* X indicates the major release version
* Y indicates a feature or sprint release
* Z indicates a bugfix or hotfix release

A major release version of `0` indicates that the project is unstable or pre-release. Once the project is deployed to a production environment, the major version should be incremented to `1`. After that point, the major version should be updated when any non-backwards-compatible changes are released.

For example, a project with three sprints might have this series of tags:
* First sprint: `0.1.0`
* Second sprint: `0.2.0`
* Bugfix after second sprint: `0.2.1`
* Launch after third sprint: `1.0.0`
* Post-launch QA sprint: `1.1.0`

In general, the development phase of our website projects will use tags like `0.1.0` and `0.5.1`; API projects where external teams are using or referencing our work may issue `1.0.0` versions before the final release, to indicate that the APIs are stable and to flag breaking changes.

## Use tag suffixes to indicate pre-release code.

Tag suffixes may be used to indicate pre-release code. In our projects, these suffixes should be limited to "-alpha", "-beta", and "-rc", in that order. "-dev" and "-stable" suffixes are discouraged, because they correspond with the development branch and the release tag, respectively. Tags with suffixes should be created on the `develop` branch rather than on the `master` branch.

For example, a project may have this series of tags towards the end of its first sprint:
* Feature freeze: `0.1.0-alpha`
* Immediately before the demo: `0.1.0-rc`
* Release to the client: `0.1.0`
