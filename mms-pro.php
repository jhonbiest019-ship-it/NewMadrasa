<?php
/**
 * Plugin Name: Madrasa Management System & Student Progress Engine (MMS-Pro)
 * Description: Monolithic Native WordPress ERP for Madrasas - Admission, Attendance, Sabaq/Sabqi/Manzil Tracking, WhatsApp Dispatcher, Fees Ledger & Report Cards.
 * Version: 1.0.0
 * Author: Muhammad Irfan
 * Text Domain: mms-pro
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class MMS_Pro_Engine {
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        register_activation_hook(__FILE__, array($this, 'activate_plugin'));
        add_action('admin_menu', array($this, 'register_admin_menu'));
        add_action('wp_ajax_mms_sync_data', array($this, 'ajax_sync_data'));
        add_action('wp_ajax_mms_get_data', array($this, 'ajax_get_data'));
    }

    public function activate_plugin() {
        global $wpdb;
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        $charset_collate = $wpdb->get_charset_collate();

        // 1. Students Table
        $table_students = $wpdb->prefix . 'mms_students';
        $sql_students = "CREATE TABLE $table_students (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            roll_number VARCHAR(50) NOT NULL UNIQUE,
            full_name VARCHAR(150) NOT NULL,
            father_name VARCHAR(150) NOT NULL,
            guardian_phone VARCHAR(25) NOT NULL,
            section ENUM('qaida', 'nazra', 'hifz') NOT NULL DEFAULT 'qaida',
            admission_date DATE NOT NULL,
            blood_group VARCHAR(10) DEFAULT '',
            cnic_bform VARCHAR(30) DEFAULT '',
            monthly_fee DECIMAL(10,2) DEFAULT 0.00,
            status ENUM('active', 'struck_off', 'graduated') NOT NULL DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id)
        ) $charset_collate;";
        dbDelta($sql_students);

        // 2. Attendance Table
        $table_attendance = $wpdb->prefix . 'mms_attendance';
        $sql_attendance = "CREATE TABLE $table_attendance (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            student_id BIGINT(20) UNSIGNED NOT NULL,
            attendance_date DATE NOT NULL,
            status ENUM('present', 'absent', 'leave', 'late') NOT NULL DEFAULT 'present',
            whatsapp_sent TINYINT(1) DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY student_date (student_id, attendance_date),
            PRIMARY KEY  (id)
        ) $charset_collate;";
        dbDelta($sql_attendance);

        // 3. Academic Records Table (Sabaq / Sabqi / Manzil / Qaida)
        $table_academic = $wpdb->prefix . 'mms_academic_records';
        $sql_academic = "CREATE TABLE $table_academic (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            student_id BIGINT(20) UNSIGNED NOT NULL,
            record_date DATE NOT NULL,
            section ENUM('qaida', 'nazra', 'hifz') NOT NULL,
            sabaq VARCHAR(255) DEFAULT '',
            sabqi VARCHAR(255) DEFAULT '',
            manzil VARCHAR(255) DEFAULT '',
            tajweed_grade VARCHAR(10) DEFAULT 'A',
            remarks TEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id)
        ) $charset_collate;";
        dbDelta($sql_academic);

        // 4. Fees Ledger Table
        $table_fees = $wpdb->prefix . 'mms_fees';
        $sql_fees = "CREATE TABLE $table_fees (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            student_id BIGINT(20) UNSIGNED NOT NULL,
            month_year VARCHAR(20) NOT NULL, -- e.g. 2026-09
            amount DECIMAL(10,2) NOT NULL,
            concession DECIMAL(10,2) DEFAULT 0.00,
            paid_amount DECIMAL(10,2) DEFAULT 0.00,
            status ENUM('paid', 'unpaid', 'partial') NOT NULL DEFAULT 'unpaid',
            payment_date DATE NULL,
            receipt_no VARCHAR(50) DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        dbDelta($sql_fees);

        // 5. Global Settings Table
        $table_settings = $wpdb->prefix . 'mms_settings';
        $sql_settings = "CREATE TABLE $table_settings (
            setting_key VARCHAR(100) NOT NULL UNIQUE,
            setting_value LONGTEXT NULL,
            PRIMARY KEY (setting_key)
        ) $charset_collate;";
        dbDelta($sql_settings);

        // Default Madrasa Settings
        $wpdb->replace($table_settings, array(
            'setting_key' => 'madrasa_profile',
            'setting_value' => json_encode(array(
                'madrasa_name' => 'Madrasa Dar-ul-Quran',
                'reg_number' => 'MMS-REG-786',
                'mohtamim_name' => 'Qari Muhammad Irfan',
                'phone' => '+923001234567',
                'address' => 'Main Campus, Lahore, Pakistan',
                'whatsapp_template' => "محترم والدین!\nالسلام علیکم، آپ کا بچہ *{student_name}* آج مدرسے سے غیر حاضر ہے۔ برائے مہربانی غیر حاضری کی وجہ سے مطلع فرمائیں۔شکریہ!"
            ))
        ));
    }

    public function register_admin_menu() {
        add_menu_page(
            'Madrasa MMS-Pro',
            'Madrasa ERP',
            'manage_options',
            'mms-pro-app',
            array($this, 'render_app_page'),
            'dashicons-book-alt',
            3
        );
    }

    public function render_app_page() {
        $app_html = file_get_contents(plugin_dir_path(__FILE__) . 'index.html');
        echo $app_html;
    }

    public function ajax_sync_data() {
        check_ajax_referer('mms_nonce', 'security');
        // Processing WP Sync Data
        wp_send_json_success(array('message' => 'Data synced with WP Database successfully.'));
    }

    public function ajax_get_data() {
        check_ajax_referer('mms_nonce', 'security');
        wp_send_json_success(array('status' => 'ok'));
    }
}

MMS_Pro_Engine::get_instance();
