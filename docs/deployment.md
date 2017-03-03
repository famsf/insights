# Deployment

This repository contains the code and configuration to assemble the Drupal site. When developing the site, all dependencies and external code should be managed with composer. However, when the site is deployed, all dependencies and external code need to be wrapped into the "artifact" so that all code required for the site to run is included in the deployment.

The general instructions for setting up this site for development are included in the main [README.md](../README.md). This document addresses building the deployment artifact.

## Building the artifact

The artifact build is fully scripted. To generate the artifact from the current code on your machine, run:

```
vendor/bin/phing deploy -Dbuild.env=artifact
```

Please review the [How to do a dry run](#How-to-do-a-dry-run) and [How to build and deploy the artifact](#How-to-build-and-deploy-the artifact) sections below before running this command.

### What the `deploy` target does

**The short version:** `deploy` gathers all of the custom code plus all of the dependencies and checks them in to a single commit on the `artifact` branch of this repository.

**The long version:**

* Check out the `artifact` branch of this repository to `artifacts/artifact`
* Remove all existing code from that directory
* Copy the `composer.json` file and all files known to git from `web/`, `conf/`, and `drush/` into the artifact directory
* Run `composer install` in the artifact directory
* Run `vendor/bin/phing build` in the artifact directory, using the build properties from `conf/build.artifact.properties`
* Check all of the files in to git
* Commit the changes to the `artifact` branch
  * If your HEAD is tagged, then the artifact is tagged to match
  * If your HEAD has un-committed changes, then the artifact commit will include a list of affected files
* Prompt you to push the new artifact commit; at this point you may wish to review the changed files:
  * `(cd artifacts/artifact && git log --stat -1)`

### How to do a dry run

1. Make sure your repsitory is clean
2. Run the deploy command with `-Dpush=n`:

  ```
  vendor/bin/phing deploy -Dbuild.env=artifact -Dpush=n
  ```
3. Review the changes to the artifact:

  ```
  (cd artifacts/artifact && git log --stat -1)
  ```
4. Check for things like:
  * Is the `index.php` present in the Drupal root?
  * Are theme files like images, js, and CSS in place?
  * Are library files in `web/libraries/` in place?
  * Are there development dependencies in `vendor/`?
  * Are the changes to `web/modules/contrib` directly related to module updates that you ran recently?
  * Are the changes to `conf/drupal/config` directly related to recent development?
5. Whether or not things look good, reset the artifact:

  ```
  (cd artifacts/artifact && git reset --hard origin/artifact)
  ```
6. If things were not right, make some changes to your repository and do another dry run.
7. If things were A-OK, proceed to tagging!

### How to build and deploy the artifact

1. Create a new release for the project on GitHub. Creating the release will also create a new tag, for example `9.9.9`.
2. On your local repository, check out the new tag:

  ```
  git fetch --all
  git checkout 9.9.9
  ```
3. Verify that you're on the correct tag:

  ```
  git describe --tags
  ```
4. Run the deploy command with `-Dpush=y`:

  ```
  vendor/bin/phing deploy -Dbuild.env=artifact -Dpush=y
  ```
5. On the test server:
  * Check out the same tag as prod is currently using
  * Import a copy of the prod db
6. Check out the new tag the dev or test server:

  ```
  git checkout build-9.9.9
  ```
7. Update the database with any new code-level changes:

  ```
  drush cim
  drush updb
  ```
8. Review the site on dev/test to verify that the latest development appears as expected.
9. Back up the prod db and note the current prod tag.
10. Repeat steps 6 & 7 on prod.

### Running the artifact on dev/test/prod

For this project, the web root is the `web/` directory within the artifact. You may alias this to the path that your web server already uses, or you may update your web server configuration to point to this directory within the artifact.
