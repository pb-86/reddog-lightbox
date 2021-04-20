<?php
/**
 * Plugin Name: RDDG Lightbox
 * Plugin URI: https://github.com/pb-86/rddg-Lightbox
 * Description: Simple and lightweight plugin that provide lightbox gallery.
 * Version: 0.1.1
 * Author: Przemek Bąchorek
 * Author URI: https://reddog.systems
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: rddglb
 * Domain Path: /languages
 *
 * RDDG Lightbox is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * RDDG Lightbox is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with RDDG Lightobx.
 *
 * @package RDDG Lightbox
 */

/**
 * Exit when accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registering main JS file.
 */
function rddglb_add_scripts() {
	wp_register_script( 'rddglb-master', plugins_url() . '/rddg-Lightbox/assets/scripts/master.js', array(), '0.1', true );
	wp_enqueue_script( 'rddglb-master' );
}
add_action( 'wp_enqueue_scripts', 'rddglb_add_scripts' );
