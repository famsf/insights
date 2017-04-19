# Deployment to Pantheon

This repository contains the custom code, contributed/external dependency code, and configuration files required to run the Drupal site. When developing the site, all dependencies and external code should be managed with composer. However, for deployment, all dependencies and external code need to be checked into the repository so that all code is included in the deployment.

The general instructions for setting up this site for development are included in the main [README.md](../README.md). This document addresses release management and deployment of the master branch.

This repository can be pushed directly to Pantheon. See the [`pantheon.yml`](../pantheon.yml) file for Pantheon-specific configuration.

## Setting Up Remotes

Please make sure locally that you have added the Pantheon remote to your git clone of this repo. You can verify the available remotes by running `git remote`. If you have not added the Pantheon remote, follow the instructions in the main [README.md](../README.md).

## Deploying the Master Branch to Pantheon

The Master branch in this repository needs to be synced with the master branch on Pantheon.

`git checkout master` (note: If you have not checked out the master branch previously, you will need to run `git checkout -b master --track origin/master`)
`git pull origin master`
`git push pantheon master`

Once the master is updated on Pantheon you will typically need to import new configurations and clear the cache. To do this through Terminus, do the following:

`terminus drush famsf-digital-stories.dev cex`
`terminus drush famsf-digital-stories.dev cr`

For more information, see Pantheon's documentation on Collaborative Development using Github and Pantheon https://pantheon.io/docs/guides/collaborative-development/#deploy-to-pantheon




