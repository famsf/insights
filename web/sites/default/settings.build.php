<?php

$databases = [];
$databases['default']['default'] = array(
  'driver' => 'mysql',
  'database' => 'drupal',
  'username' => 'root',
  'password' => 'root',
  'host' => '127.0.0.1',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
);

$config_directories = [];
$config_directories[CONFIG_SYNC_DIRECTORY] = '../conf/drupal/config';

$settings['hash_salt'] = '2a3c7df42e352429e35986a487c9ae9b21ca415f8363171bcb28993d407e624b';
$settings['update_free_access'] = FALSE;
$settings['container_yamls'][] = __DIR__ . '/services.build.yml';

$settings['file_public_path'] = 'sites/default/files';
$settings['file_private_path'] = '';
$settings['install_profile'] = 'config_installer';

// 302 Redirect from /old to /new.
if (($_SERVER['REQUEST_URI'] == '/teo') &&
  // Check if Drupal or WordPress is running via command line
  (php_sapi_name() != "cli")) {
  header('HTTP/1.0 301 Moved Permanently');
  header('Location: https://deyoung.famsf.org/digital-stories');
  exit();
}
