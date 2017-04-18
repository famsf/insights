# Using `.gitignore` correctly

## What is `.gitignore`?

There are lots of files on your file system that don't belong in a code repository. Having a `.gitignore` file in your project helps keep out those unwanted files like `.DS_Store` or `some-awesome-file.php~` and even can help prevent accidentally committing sensitive files like `sites/default/settings.php` or `app/config/parameters.yml`.

A [`.gitignore`](https://git-scm.com/docs/gitignore) file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected, so it's important to get your `.gitignore` file correct from the start.

## Using `.gitignore`

There are two ways use use `.gitignore` files: globally and per project.

### Globally

You should create a global `.gitignore` file so that you don't accidentally commit metadata files to your repositories.

Create the file in your home directory:

```
$ touch ~/.gitignore
```

Add the following lines to the `.gitignore` (borrowed from [sb2nov/mac-setup](https://github.com/sb2nov/mac-setup/blob/master/Git/gitignore.md)):

```
# Folder view configuration files
.DS_Store

# cache files
._*

# Files that might appear on external disks
.Spotlight-V100
.Trashes

# IDE files
.idea

# Application specific files
node_modules
.sass-cache
```

Finally, tell git about this file by adding it to your `~/.gitconfig`:

```
$ git config --global core.excludesfile ~/.gitignore
```

### Per Project

The project `.gitignore` should only contain explicit excludes for the project. For example: `sites/default/settings.php`, `vendor/`, `build/artifacts/*`, and `.vagrant`. This file should NOT contain anything that does not directly relate to this project.

## Resources

Sometimes it is hard to figure out what should go into the `.gitignore` file. Luckily there are resources for you! GitHub has a [living repository](https://github.com/github/gitignore) for all sorts of `.gitignore` files. If you're the type to like CLI tools then check out [gitignore.io](https://www.gitignore.io/docs) or [Joe](http://karan.goel.io/joe/).
