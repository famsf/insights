# Release Syncing & Deployment to Pantheon

This repository contains the custom code, contributed/external dependency code, and configuration files required to run the Drupal site. When developing the site, all dependencies and external code should be managed with composer. However, for deployment, all dependencies and external code need to be checked into the repository so that all code is included in the deployment.

The general instructions for setting up this site for development are included in the main [README.md](../README.md). This document addresses release management and deployment of the master branch.

This repository can be pushed directly to Pantheon. See the [`pantheon.yml`](../pantheon.yml) file for Pantheon-specific configuration.

## Setting Up Remotes

Please make sure locally that you have added the Pantheon remote to your git clone of this repo. You can verify the available remotes by running `git remote`. If you have not added the Pantheon remote, follow the instructions in the main [README.md](../README.md).

## Syncing the Master Branch

The Master branch in this repository needs to be synced with the master branch on Pantheon.

Before merging a new release to master, you need checkout the master brnach from Pantheon.
`git fetch --all`
`git checkout pantheon/master`
`git pull`
`git checkout origin/master`
`git merge patheon/master`

Now you should merge in and tag your new release on master.
Be sure to push to the repo master and then merge to the Pantheon master
`git push`
`git checkout pantheon/master`
`git merge origin/master`

Now you should have the latest code on both the Pantheon and FAMSF Digital Stories master branches. 





