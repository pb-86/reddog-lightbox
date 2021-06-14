<?php
/**
 * Plugin Name: RDDG Lightbox
 * Plugin URI: https://github.com/pb-86/rddg-Lightbox
 * Description: Simple and lightweight plugin that provide lightbox gallery.
 * Version: 0.2.15
 * Author: Reddog Systems
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

define( 'PLUGIN_VERSION', '0.2.15' );
define( 'PLUGIN_PATH', plugins_url() . '/rddg-Lightbox/' );
define( 'IMAGES_PATH', PLUGIN_PATH . 'assets/images/' );
define( 'SCRIPTS_PATH', PLUGIN_PATH . 'assets/scripts/' );
define( 'STYLES_PATH', PLUGIN_PATH . 'assets/styles/css/' );

/**
 * Registering and enqueing JS files
 */
function rddglb_add_scripts() {
	if ( is_singular() ) {
		wp_register_script( 'rddglb-master', SCRIPTS_PATH . 'master.js', array(), PLUGIN_VERSION, true );
		wp_enqueue_script( 'rddglb-master' );
	}
}
add_action( 'wp_enqueue_scripts', 'rddglb_add_scripts' );

/**
 * Registering and enqueing CSS files
 */
function rddglb_add_styles() {
	if ( is_singular() ) {
		wp_register_style( 'rddglb-master', STYLES_PATH . 'master.css', array(), PLUGIN_VERSION, 'all' );
		wp_enqueue_style( 'rddglb-master' );
	}
}
add_action( 'wp_enqueue_scripts', 'rddglb_add_styles' );

/**
 * Adds HTML code of the modal to the end of the_content
 *
 * @param string $content Content of the_content.
 * @return string Modified the_content.
 */
function rddglb_add_modal( $content ) {
	$modal_html = rddglb_get_modal_html();
	return $content . $modal_html;
}
add_filter( 'the_content', 'rddglb_add_modal', 50 );

/**
 * HTML of the modal
 *
 * @return string $html HTML code of the modal.
 */
function rddglb_get_modal_html() {
	$html  = '<div class="rddglb-modal" id="rddglb-modal" aria-hidden="true">';
	$html .= '<button class="rddglb-modal__button rddglb-modal__button--close" id="rddglb-closeButton" aria-label="Zamknij"><img src="' . IMAGES_PATH . 'icon-close.svg" height="16" width="16" alt=""></button>';
	$html .= '<div class="rddglb-modal__buttons">';
	$html .= '<button class="rddglb-modal__button rddglb-modal__button--prev" id="rddglb-prevButton" aria-label="Poprzednie"><img src="' . IMAGES_PATH . 'icon-prev.svg" height="26" width="16" alt=""></button>';
	$html .= '<button class="rddglb-modal__button rddglb-modal__button--next" id="rddglb-nextButton" aria-label="Następne"><img src="' . IMAGES_PATH . 'icon-next.svg" height="26" width="16" alt=""></button>';
	$html .= '</div>';
	$html .= '<img class="rddglb-modal__loading rddglb-modal__loading--hide" id="rddglb-loading" src="' . IMAGES_PATH . 'icon-loading.svg" height="24" width="24" alt="">';
	$html .= '<img class="rddglb-modal__full-image" id="rddglb-fullImage" src="" alt="">';
	$html .= '<div class="rddglb-modal__counter" id="rddglb-counter">';
	$html .= '<span class="rddglb-modal__counter-current" id="rddglb-counterCurrent"></span>';
	$html .= '<span class="rddglb-modal__counter-separator">/</span>';
	$html .= '<span class="rddglb-modal__counter-all" id="rddglb-counterAll"></span>';
	$html .= '</div>';
	$html .= '</div>';
	return $html;
}
