<?php

// Basic config from Drupal's settings.default.php
$databases = [];
$config_directories = [];
$settings['update_free_access'] = FALSE;
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';
$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];

$settings['install_profile'] = 'config_installer';

// Standard Pantheon settings file
// @see https://github.com/pantheon-systems/drops-8/blob/master/sites/default/settings.pantheon.php
include __DIR__ . "/settings.pantheon.php";

// In this codebase, config is managed by git and lives outside of the Drupal root.
$config_directories[CONFIG_SYNC_DIRECTORY] = '../conf/drupal/config';

// Dev environment settings file provided by the-build.
$settings_file = __DIR__ . '/settings.build.php';
if (file_exists($settings_file)) {
  include $settings_file;
}

// Local, per-developer config.
$settings_file = __DIR__ . '/settings.local.php';
if (file_exists($settings_file)) {
  include $settings_file;
}
