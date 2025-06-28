<?php
/*
Plugin Name: Drop Cap for Classic Editor
Description: Adds drop cap functionality to WordPress Classic Editor
Version: 1.2
Author: Damon Noisette
License: GPL2
*/

defined('ABSPATH') || exit;

class DropCapClassicEditor {
    public function __construct() {
        add_action('init', array($this, 'setup_tinymce_plugin'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));
    }

    public function setup_tinymce_plugin() {
        if (!current_user_can('edit_posts') && !current_user_can('edit_pages')) {
            return;
        }

        if (get_user_option('rich_editing') !== 'true') {
            return;
        }

        add_filter('mce_external_plugins', array($this, 'add_tinymce_plugin'));
        add_filter('mce_buttons', array($this, 'add_tinymce_button'));
    }

    public function add_tinymce_plugin($plugins) {
        $plugins['dropcap'] = plugins_url('js/tinymce-dropcap.js', __FILE__);
        return $plugins;
    }

    public function add_tinymce_button($buttons) {
        array_push($buttons, 'dropcap');
        return $buttons;
    }

    public function enqueue_styles() {
        wp_enqueue_style(
            'dropcap-styles',
            plugins_url('css/dropcap.css', __FILE__)
        );
    }
}

new DropCapClassicEditor();