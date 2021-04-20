<?php
/**
 * Plugin Name: RDDG Lightbox
 * Plugin URI: https://github.com/pb-86/rddg-Lightbox
 * Description: Simple and lightweight plugin that provide lightbox gallery.
 * Version: 0.2.1
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
 * Registering and enqueing JS files
 */
function rddglb_add_scripts() {
	wp_register_script( 'rddglb-master', plugins_url() . '/rddg-Lightbox/assets/scripts/master.js', array(), '0.2.1', true );
	wp_enqueue_script( 'rddglb-master' );
}
add_action( 'wp_enqueue_scripts', 'rddglb_add_scripts' );

/**
 * Registering and enqueing CSS files
 */
function rddglb_add_styles() {
	wp_register_style( 'rddglb-master', plugins_url() . '/rddg-Lightbox/assets/styles/css/master.css', array(), '0.2.1', 'all' );
	wp_enqueue_style( 'rddglb-master' );
}
add_action( 'wp_enqueue_scripts', 'rddglb_add_styles' );

/**
 * Adds HTML code of modal to the end of the_content
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
 * HTML od the modal
 *
 * @return string $html HTML code of the modal.
 */
function rddglb_get_modal_html() {
	$html  = '<div class="rddglb-modal" id="rddglb-modal" aria-hidden="true">';
	$html .= '<div class="rddglb-modal__buttons">';
	$html .= '<button class="rddglb-modal__button rddglb-modal__button--prev" id="rddglb-prevButton"><img src="' . plugins_url() . '/rddg-Lightbox/assets/images/icon-prev.svg" height="32" width="20"></button>';
	$html .= '<button class="rddglb-modal__button rddglb-modal__button--next" id="rddglb-nextButton"><img src="' . plugins_url() . '/rddg-Lightbox/assets/images/icon-next.svg" height="32" width="20"></button>';
	$html .= '</div>';
	$html .= '<img class="rddglb-modal__full-image" id="rddglb-fullImage" src="">';
	$html .= '</div>';
	return $html;
}
