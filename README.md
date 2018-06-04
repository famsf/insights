# Kalamuna.com [![Build Status](https://magnum.travis-ci.com/kalamuna/kalamuna.com.svg?token=UMJYkSsaxoyZWAhX7jyb&branch=master)](https://magnum.travis-ci.com/kalamuna/kalamuna.com)

The new prototype hawtness.


## Stack

* [Metalsmith](http://www.metalsmith.io) is used for static site generation
* [Gulp](http://gulpjs.com) is used as a development tool
* [Swig](https://paularmstrong.github.io/swig/) for HTML templating
* [SCSS](http://sass-lang.com/) for CSS pre-processing


## Requirements

* [Node.js](http://nodejs.org/) >=4.2.1 though thats a bit old.


## Usage

### Download the site

    git clone git@github.com:kalamuna/kalamuna.com.git
    cd kalamuna.com


### Install Dependencies

    npm install


### Build

1. Build the site using the following command:

  ```
  npm test
  ```

### Development

1. Start the server by running the following command:

  ```
  npm start
  ```

2. Visit the site at `http://localhost:3000`

3. Visit the styleguide at `http://localhost:8000/styleguide/section-1.html`

## Collaboration

Kalamuna.com uses a modified [github flow](https://guides.github.com/introduction/flow/index.html) model for its collaboration workflow. Some of the key points here that should be obeyed:

1. The code in `master` is always deployable. This means you should *never ever ever commit directly to master.*
2. You should open a branch for every issue/topic/feature you are working on. The name of the branch should be the issue number, followed a hyphen and a named description. For example, if the issue you're working on is 47, and you're adding a Picard feature, the branch name would be `47-picard`.
3. When you feel like your branch is in a good place to QA push it and submit a pull request.
4. Visit the [Pantheon Multidev settings](https://dashboard.getpantheon.com/sites/949b4f63-5ec6-4c65-ba10-c05f48cd90bd#multidev/overview/git-branches) and ensure an environment is created for your pull request for the git branch of the same name.
5. In order for Pull Requests to be merged, they need to get code reviewed and a `:+1:` from at least two different team members.
6. The Pull Request is than merged by someone other than the original branch author.
7. We deploy to [pantheon](http://getpantheon.com) and except in very very rare circumstances all commits to pantheon should be by robots.

## Test, build and deploy

Kalamuna.com uses [Travis CI](https://magnum.travis-ci.com) to test, build and deploy its code. At a high level the following steps happen for every pull request that is opened.

1. Contributor submits a pull request and Travis is triggered to run tests on the source code and also the build.
2. If the tests fail then code should not be merged into master and people are notified of such shameful activity.
3. If code tests pass then code then undergoes a manuel review.
4. If the manual review passes then the PR is merged and a final Travis test/build is triggered.
5. If this passes then the built code is deployed to our Pantheon dev environment.

This is another reason why code should *never ever ever be committed directly to master.*

### Deployment

Use `npm run deploy` to deploy the site manually.
