# Deployment

This repository contains the custom code, contributed/external dependency code, and configuration files required to run the Drupal site. When developing the site, all dependencies and external code should be managed with composer. However, for deployment, all dependencies and external code need to be checked into the repository so that all code is included in the deployment.

The general instructions for setting up this site for development are included in the main [README.md](../README.md). This document addresses building the deployment artifact.

## Pantheon

This repository can be pushed directly to Pantheon. See the [`pantheon.yml`](../pantheon.yml) file for Pantheon-specific configuration.
