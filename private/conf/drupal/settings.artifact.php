<?php

// Include the Blackmesh database connection array and other private config.
if (file_exists('/path/to/settings.blackmesh.inc')) {
  require '/path/to/settings.blackmesh.inc';
}

$config_directories = array();
$config_directories[CONFIG_SYNC_DIRECTORY] = '${drupal.config_sync_directory}';

$settings['hash_salt'] = '${drupal.hash_salt}';
$settings['update_free_access'] = FALSE;
$settings['container_yamls'][] = __DIR__ . '/services.yml';

$settings['file_public_path'] = '${drupal.settings.file_public_path}';
$settings['file_private_path'] = '${drupal.settings.file_private_path}';

$settings['trusted_host_patterns'] = array(
  '^some-domain-name.com',
);

/**
@todo In order to make this work, we need an environment variable or some way
      of determining whether we're running on dev or staging; right now this
      uses the fake environment variable 'THIS_IS_NOT_PRODUCTION'.

//// Add an htaccess prompt on dev, similar to the way we do for Acquia.
//// @see https://docs.acquia.com/articles/password-protect-your-non-production-environments-acquia-hosting#phpfpm

// Make sure Drush keeps working.
// Modified from function drush_verify_cli()
$cli = (php_sapi_name() == 'cli');

// Apply http basic auth to dev and staging environments.
if (!$cli && (isset($_ENV['THIS_IS_NOT_PRODUCTION']) && $_ENV['THIS_IS_NOT_PRODUCTION'])) {
  $username = 'palantir';
  $password = 'some mediocre password';
  if (!(isset($_SERVER['PHP_AUTH_USER']) && ($_SERVER['PHP_AUTH_USER']==$username && $_SERVER['PHP_AUTH_PW']==$password))) {
    header('WWW-Authenticate: Basic realm="This site is protected"');
    header('HTTP/1.0 401 Unauthorized');
    // Fallback message when the user presses cancel / escape
    echo 'Access denied';
    exit;
  }
}
*/
