# Mac Setup

See [sb2nov/mac-setup](https://github.com/sb2nov/mac-setup) for additional documentation.

## Mac OS Version
Your Mac should be running OS X 10.10, 10.11, or preferably 10.12

## Key development software

| Software | What's it for? | Recommended installation method |
|---|---|---|
| XCode | Fundamental Mac development tools | [Download a disk image](https://developer.apple.com/xcode/) or use the App Store |
| XCode command line tools | Git | `xcode-select --install` |
| Homebrew | Installing more command line tools | Follow the [official instructions](http://brew.sh/). After installing:<br>1. Run `echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.bash_profile`<br>2. Run `brew doctor` in a new terminal to verify. |
| Homebrew Cask* | Installing Mac applications from the command line | `brew tap caskroom/cask` |
| Git | Version control | Update from the version provided by XCode with `brew install git` |
| PHP | Running composer, and everything else | Comes with your Mac. Install PHP 7 with `brew install homebrew/php/php70` |
| Composer | Our projects use this to manage dependencies | Install with the [instructions on getcomposer.org](https://getcomposer.org/download/)<br>Update regularly with `composer self-update` |
| Vagrant | Our projects use this to manange virtual machine based development environments | Homebrew Cask: `brew cask install vagrant`<br>Manual: [Download the disk image](https://www.vagrantup.com/) |
| Vagrant plugins | Managing networking config for Vagrant | `vagrant plugin install vagrant-hostmanager`<br>`vagrant plugin install vagrant-auto_network`<br>`vagrant plugin install vagrant-triggers`<br>If you update Vagrant, run `vagrant plugin update` |
| VMware<sup>†$</sup> | Running virtual machines | Homebrew Cask: `brew cask install vmware-fusion`<br>Manual: [Download the disk image](http://www.vmware.com/products/fusion.html)<br>Our usage also requires installing the [VMware integration for Vagrant<sup>$</sup>](https://www.vagrantup.com/vmware/) |
| VirtualBox<sup>†</sup> | Running virtual machines | Homebrew Cask: `brew cask install virtualbox`<br>Manual: [Download the disk image](https://www.virtualbox.org/). |
| Ansible | Our projects use this to provision development environments | Homebrew: `brew install ansible`<br>The [official documentation](http://docs.ansible.com/ansible/intro_installation.html) recommends `easy_install` + `pip`, but this route is much less pleasant. |
| NodeJS<sup>‡</sup> | Running npm | `brew install node` |
| npm<sup>‡</sup> | Running Butler | `brew install npm` |
| Ruby<sup>§</sup> | Running bundler | An adequate version comes with your Mac. |
| bundler<sup>§</sup> | Managing Ruby packages, including the Ruby sass compilation library | `gem install bundler` |

\* Totally optional. Maybe you prefer the App Store.

<sup>†</sup> Pick one.

<sup>‡</sup> You may not need to install this, since it should be available on your VM-based development environments.

<sup>§</sup> Don't mess with this unless you run into a situation that requires it.

## Git configuration

### Attribution for your commits

Define your Git user (should be the same name and email you use for [GitHub](https://github.com/)):

    $ git config --global user.name "Your Name Here"
    $ git config --global user.email "your_email@youremail.com"

This will get added to your `.gitconfig` file.

### Generating an SSH key

Follow [GitHub's instructions](https://help.github.com/articles/generating-an-ssh-key/) to generate an SSH key and add it to your GitHub account. Eventually you will use this key for other systems, like your Acquia account.

### Global `.gitignore`

Create the file `~/.gitignore` as shown below to remove the files that are almost always ignored in all git repositories.


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
    .vagrant


Then add the file to your `~/.gitconfig`

    $ git config --global core.excludesfile ~/.gitignore

### Git information in your prompt

Adding git information to your terminal prompt is highly recommended. Add the following code to your `~/.profile`:

```
# Git prompt
if [ -f /usr/local/etc/bash_completion.d/git-prompt.sh ]; then
  source /usr/local/etc/bash_completion.d/git-prompt.sh
  export PS1="[\D{%l:%M%P} \u@`scutil --get ComputerName`:\w]\`__git_ps1\` \$ "
fi

# Git tab completion
if [ -f /usr/local/etc/bash_completion.d/git-completion.bash ]; then
  source /usr/local/etc/bash_completion.d/git-completion.bash
fi
```

This adds the current branch or tag to your terminal prompt, which will report the git branch (`develop`) like this:

```
[ 7:20P white@mycomputer:~/repos/drupal-skeleton] (develop) $
```

## Additional Mac Applications

You may also want some of these:

```
brew cask install hipchat
brew cask install 1password

# VPN client
brew cask install torguard

# Browsers
brew cask install google-chrome
brew cask install firefox

# Your preferred code editor
brew cask install phpstorm
brew cask install atom
brew cask install sublime-text
```

Feel free to use the Mac App Store or another installation method if you prefer.

## Misc other system tweaks
### SSH keys in macOS Sierra
> As described in detail on https://openradar.appspot.com/27348363, macOS/OS X till Yosemite used to remember SSH keys added by command ssh-add -K <key>.
> 
> Unfortunately this way no longer works and command ssh-add -K in macOS Sierra no longer saves SSH keys in OS's keychain. 

Download the file or run the `curl` command [from this page](https://github.com/jirsbek/SSH-keys-in-macOS-Sierra-keychain#solution) to re-enable automatically loading SSH keys on reboot.
