# GitHub Labels

Labels are a mechanism of adding state data (and sometimes meta data) to Pull Requests (PRs) and Issues on GitHub. Though labels are highly dynamic and can be customized on a per-project basis, you should expect the following labels (and their respective meanings and intents) across all Palantir projects. To be clear: your project may use more labels than the ones outlined below, but these labels are meant to be used across multiple projects.

If a PR doesn't have a label, it is assumed that the PR still needs work by the person assigned the PR.

## Labels:

### WIP (Suggested Color: Yellow / #fbca04)

"WIP" (or Work in Progress) indicates that the person who is assigned the PR or issue has a clear understanding of the next steps required to move the issue forward and that they are currently (or imminently going to start) working on it.

This label indicates that the code in the PR is not yet ready for review as there are planned changes.

### Open Question (Suggested Color: Purple / #9933ff)

This label should be used when there are open questions relating to the PR or issue that are blocking the next action. When this label is applied to an issue or a PR, it should also be assigned to the person who can provide the needed feedback.

### Merge Conflict (Suggested Color: Red / #d93f0b)

This label should be used when a PR is not ready to be reviewed or merged due to merge conflicts. When assigning this label, you should assign the PR back to the author of the branch so they can resolve the merge conflicts.

If you are resolving a merge conflict, you should remove this label once the conflicts have been resolved.

### Ready for Review (Suggested Color: Green / #0e8a16)

This label should be assigned to a PR by the author of the branch when the author believes the work to be complete. When this label is applied, the PR should be assigned to the appropriate person (usually the Project Lead). See your project's CONTRIBUTING.md document or ask the project's PM if you don't know who to assign it to.
