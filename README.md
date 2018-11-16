# FAMSF Insights [![(build status icon goes here)]()]()


## Stack

* [Metalsmith](http://www.metalsmith.io) is used for static site generation
* [Gulp](http://gulpjs.com) is used as a development tool
* [Swig](https://paularmstrong.github.io/swig/) for HTML templating
* [SCSS](http://sass-lang.com/) for CSS pre-processing


## Requirements

* [Node.js](http://nodejs.org/) >=4.2.1 though thats a bit old.


## Usage

### Download the site

    git clone git@github.com:famsf/insights.com.git
    cd insights


### Install Dependencies

    npm install


### Build

1. Make sure [`_auth.json` is set up correctly](https://github.com/famsf/insights/wiki#gathercontent) for GatherContent integration
2. Build the site using the following command:

  ```
  npm test
  ```


### Development

1. Make sure [`_auth.json` is set up correctly](https://github.com/famsf/insights/wiki#gathercontent) for GatherContent integration
2. Start the server by running the following command:

  ```
  npm start
  ```

3. Visit the site at `http://localhost:3000`


## Collaboration

FAMSF Insights uses a modified [github flow](https://guides.github.com/introduction/flow/index.html) model for its collaboration workflow. Some of the key points here that should be obeyed:

1. The code in `master` is always deployable. This means you should *never ever ever commit directly to master.*
2. You should open a branch for every issue/topic/feature you are working on. The name of the branch should be the issue number, followed a hyphen and a named description. For example, if the issue you're working on is 47, and you're adding a Picard feature, the branch name would be `47-picard`.
3. When you feel like your branch is in a good place to QA push it and submit a pull request.
4. In order for Pull Requests to be merged, they need to get code reviewed and approved.
5. The Pull Request is than merged by someone other than the original branch author.

## Test, build and deploy!

Forthcoming.


### Deployment

Use `npm run deploy` to deploy the site manually.
