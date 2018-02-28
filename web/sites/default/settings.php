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

if (isset($_SERVER['PANTHEON_ENVIRONMENT']) && php_sapi_name() != 'cli') {
  // Redirect to https://$primary_domain in the Live environment
  if ($_ENV['PANTHEON_ENVIRONMENT'] === 'live') {
    /** Replace www.example.com with your registered domain name */
    $primary_domain = 'digitalstories.famsf.org';
  }
  else {
    // Redirect to HTTPS on every Pantheon environment.
    $primary_domain = $_SERVER['HTTP_HOST'];
  }

  if ($_SERVER['HTTP_HOST'] != $primary_domain
      || !isset($_SERVER['HTTP_X_SSL'])
      || $_SERVER['HTTP_X_SSL'] != 'ON' ) {

    # Name transaction "redirect" in New Relic for improved reporting (optional)
    if (extension_loaded('newrelic')) {
      newrelic_name_transaction("redirect");
    }

    header('HTTP/1.0 301 Moved Permanently');
    header('Location: https://'. $primary_domain . $_SERVER['REQUEST_URI']);
    exit();
  }
  // Drupal 8 Trusted Host Settings
  if (is_array($settings)) {
    $settings['trusted_host_patterns'] = array('^'. preg_quote($primary_domain) .'$');
  }
}

// 301 Redirect from /old to /new.
if (($_SERVER['REQUEST_URI'] == '/cult-machine') &&
    // Check if Drupal or WordPress is running via command line
    (php_sapi_name() != "cli")) {
    header('HTTP/1.0 301 Moved Permanently');
    header('Location: /machine');
    exit();
}
