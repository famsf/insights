<?php

$databases = [];
$databases['default']['default'] = array(
  'driver' => 'mysql',
  'database' => '${drupal.database.database}',
  'username' => '${drupal.database.username}',
  'password' => '${drupal.database.password}',
  'host' => '${drupal.database.host}',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
);

$config_directories = [];
$config_directories[CONFIG_SYNC_DIRECTORY] = '${drupal.config_sync_directory}';

$settings['hash_salt'] = '${drupal.hash_salt}';
$settings['update_free_access'] = FALSE;
$settings['container_yamls'][] = __DIR__ . '/services.build.yml';

$settings['file_public_path'] = '${drupal.settings.file_public_path}';
$settings['file_private_path'] = '${drupal.settings.file_private_path}';
$settings['install_profile'] = '${drupal.profile}';
