<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Dashboard/Home route
$routes->get('/', 'Home::index');
$routes->get('dashboard', 'Home::index');

// All Menus - Separate controller & view
$routes->get('all-menus', 'AllMenusController::index');

// Task History - Separate controller & view
$routes->get('history', 'HistoryController::index');

// Profile/Data Pribadi - Separate controller & view
$routes->get('profile', 'ProfileController::index');

// Presensi Online - Separate controller & view
$routes->get('presensi', 'PresensiController::index');

// Data Presensi - Separate controller & view
$routes->get('data-presensi', 'DataPresensiController::index');

// API routes for notifications (AJAX)
$routes->get('api/notifications', 'NotificationController::getNotifications');
$routes->post('api/notifications/mark-read/(:num)', 'NotificationController::markAsRead/$1');

// API routes for tasks (AJAX) - if needed
$routes->get('api/tasks', 'TaskController::getTasks');
$routes->post('api/tasks/save', 'TaskController::save');
$routes->post('api/tasks/delete/(:num)', 'TaskController::delete/$1');