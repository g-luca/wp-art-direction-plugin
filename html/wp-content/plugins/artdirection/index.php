<?php

/**
 * ArtDirection
 *
 * @package           ArtDirection
 * @copyright         2021
 * @license           MIT
 *
 * @wordpress-plugin
 * Plugin Name:       ArtDirection
 * Description:       Plugin for art direction rules and resolution switching.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Project designed for the Course of Progettazione e Produzione Multimediale del Prof. Alberto Del Bimbo - Università degli studi di firenze; Idea by Andrea Ferracani; Development by Luca Graziotti & Alessio Magnanensi
 * Text Domain:       wp-artdirection
 * License:           MIT
 */


defined('ABSPATH') || exit;

/**
 * Load all translations for our plugin from the MO file.
 */
/* add_action('init', 'gutenberg_examples_05_load_textdomain');

function wp_artdirection_load_textdomain()
{
    load_plugin_textdomain('wp-artdirection', false, basename(__DIR__) . '/languages');
}
 */


function gutenberg_examples_05_register_block()
{

    if (!function_exists('register_block_type')) {
        // Gutenberg is not active.
        return;
    }

    wp_register_script(
        'wp-artdirection',
        plugins_url('artdirection.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore'),
        filemtime(plugin_dir_path(__FILE__) . 'artdirection.js')
    );

    wp_register_style(
        'wp-artdirection',
        plugins_url('style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'style.css')
    );

    register_block_type('wp-artdirection/image', array(
        'style' => 'wp-artdirection',
        'editor_script' => 'wp-artdirection',
    ));

    if (function_exists('wp_set_script_translations')) {
        /**
         * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
         * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
         * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
         */
        wp_set_script_translations('wp-artdirection', 'wp-artdirection');
    }
}
add_action('init', 'gutenberg_examples_05_register_block');
