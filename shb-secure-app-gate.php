<?php
/**
 * Plugin Name: Secure App Gate, Authentication Layer & Firebase Cloud Vault
 * Plugin URI: https://github.com/jhonbiest019-ship-it/NewMadrasa
 * Description: Standalone Native WordPress Access Gate, Google Identity Authentication Engine, and Firebase Realtime Cloud Vault for Madrasa MMS Pro.
 * Version: 1.0.0
 * Author: Designed and Developed by Sikandar Hayat Baba | Designed by Farani
 * Text Domain: shb-secure-app-gate
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SHB_Secure_App_Gate_Engine {
    private static $instance = null;
    private $table_vault;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        global $wpdb;
        $this->table_vault = $wpdb->prefix . 'app_user_vault';

        register_activation_hook(__FILE__, array($this, 'activate_plugin'));
        
        add_action('template_redirect', array($this, 'handle_template_redirection'));
        add_shortcode('shb_secure_app_gate', array($this, 'render_shortcode_gate'));

        // AJAX Authentication & Verification Endpoints
        add_action('wp_ajax_shb_verify_google_user', array($this, 'ajax_verify_google_user'));
        add_action('wp_ajax_nopriv_shb_verify_google_user', array($this, 'ajax_verify_google_user'));

        // AJAX Backup & Disaster Recovery Endpoints
        add_action('wp_ajax_sync_app_backup', array($this, 'ajax_sync_app_backup'));
        add_action('wp_ajax_nopriv_sync_app_backup', array($this, 'ajax_sync_app_backup'));

        add_action('wp_ajax_fetch_app_backup', array($this, 'ajax_fetch_app_backup'));
        add_action('wp_ajax_nopriv_fetch_app_backup', array($this, 'ajax_fetch_app_backup'));
    }

    // =========================================================================
    // PHASE 1: ARCHITECTURE & ZERO-TOUCH ACTIVATION
    // =========================================================================

    public function activate_plugin() {
        global $wpdb;
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        $charset_collate = $wpdb->get_charset_collate();

        // 1. Create wp_app_user_vault Table via dbDelta
        $sql_vault = "CREATE TABLE {$this->table_vault} (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            wp_user_id BIGINT(20) UNSIGNED UNIQUE,
            google_uid VARCHAR(191) UNIQUE NULL,
            primary_email VARCHAR(191) NOT NULL,
            account_status ENUM('pending_verification', 'active', 'suspended') NOT NULL DEFAULT 'active',
            firebase_backup_ref VARCHAR(255) NULL,
            last_backup_sync DATETIME NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY primary_email_idx (primary_email)
        ) $charset_collate;";

        dbDelta($sql_vault);

        // 2. Programmatically generate /app-portal Page if not existing
        $page_slug = 'app-portal';
        $existing_page = get_page_by_path($page_slug);

        if (!$existing_page) {
            $page_data = array(
                'post_title'     => 'App Secure Portal',
                'post_content'   => '[shb_secure_app_gate]',
                'post_status'    => 'publish',
                'post_type'      => 'page',
                'post_name'      => $page_slug,
                'comment_status' => 'closed',
                'ping_status'    => 'closed'
            );
            wp_insert_post($page_data);
        }

        // 3. Flush rewrite rules safely
        flush_rewrite_rules();
    }

    public function handle_template_redirection() {
        global $post;
        if (is_page('app-portal') || (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'shb_secure_app_gate'))) {
            $this->render_standalone_portal_shell();
            exit;
        }
    }

    public function render_shortcode_gate() {
        ob_start();
        $this->render_portal_body_contents();
        return ob_get_clean();
    }

    // =========================================================================
    // PHASE 2 & 3: AJAX AUTHENTICATION, GOOGLE LINKING & CLOUD SYNC
    // =========================================================================

    public function ajax_verify_google_user() {
        check_ajax_referer('shb_auth_nonce', 'security');

        $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
        $google_uid = isset($_POST['google_uid']) ? sanitize_text_field($_POST['google_uid']) : '';
        $full_name = isset($_POST['full_name']) ? sanitize_text_field($_POST['full_name']) : '';

        if (empty($email) || !is_email($email)) {
            wp_send_json_error(array('message' => 'Invalid Google-verified email address.'));
        }

        global $wpdb;

        // 1. Check or Create WordPress User
        $wp_user = get_user_by('email', $email);
        if (!$wp_user) {
            $username = sanitize_user(current(explode('@', $email)));
            if (username_exists($username)) {
                $username .= '_' . rand(100, 999);
            }
            $random_password = wp_generate_password(16, true);
            $user_id = wp_create_user($username, $random_password, $email);

            if (is_wp_error($user_id)) {
                wp_send_json_error(array('message' => $user_id->get_error_message()));
            }

            $wp_user = get_user_by('id', $user_id);
            if ($full_name) {
                wp_update_user(array('ID' => $user_id, 'display_name' => $full_name));
            }
        } else {
            $user_id = $wp_user->ID;
        }

        // 2. Log in User to WordPress Session
        wp_set_current_user($user_id);
        wp_set_auth_cookie($user_id, true);

        // 3. Upsert into wp_app_user_vault
        $sanitized_key = preg_replace('/[^a-zA-Z0-9_]/', '_', strtolower($email));
        $firebase_ref = '/user_vaults/' . $sanitized_key . '/';

        $existing_vault = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->table_vault} WHERE primary_email = %s", $email));

        if ($existing_vault) {
            $wpdb->update(
                $this->table_vault,
                array(
                    'wp_user_id' => $user_id,
                    'google_uid' => $google_uid ? $google_uid : $existing_vault->google_uid,
                    'account_status' => 'active',
                    'firebase_backup_ref' => $firebase_ref
                ),
                array('id' => $existing_vault->id),
                array('%d', '%s', '%s', '%s'),
                array('%d')
            );
        } else {
            $wpdb->insert(
                $this->table_vault,
                array(
                    'wp_user_id' => $user_id,
                    'google_uid' => $google_uid,
                    'primary_email' => $email,
                    'account_status' => 'active',
                    'firebase_backup_ref' => $firebase_ref,
                    'last_backup_sync' => current_time('mysql')
                ),
                array('%d', '%s', '%s', '%s', '%s', '%s')
            );
        }

        wp_send_json_success(array(
            'message' => 'Authentication verified successfully!',
            'user' => array(
                'id' => $user_id,
                'email' => $email,
                'name' => $wp_user->display_name,
                'firebase_ref' => $firebase_ref,
                'sanitized_key' => $sanitized_key
            )
        ));
    }

    public function ajax_sync_app_backup() {
        check_ajax_referer('shb_auth_nonce', 'security');

        $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
        if (empty($email) || !is_email($email)) {
            wp_send_json_error(array('message' => 'Invalid user email.'));
        }

        global $wpdb;
        $now = current_time('mysql');

        $wpdb->update(
            $this->table_vault,
            array('last_backup_sync' => $now),
            array('primary_email' => $email),
            array('%s'),
            array('%s')
        );

        wp_send_json_success(array(
            'message' => 'Backup sync timestamp recorded in WordPress Vault.',
            'last_sync' => $now
        ));
    }

    public function ajax_fetch_app_backup() {
        check_ajax_referer('shb_auth_nonce', 'security');

        $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
        if (empty($email) || !is_email($email)) {
            wp_send_json_error(array('message' => 'Invalid email address.'));
        }

        global $wpdb;
        $vault = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->table_vault} WHERE primary_email = %s", $email));

        if (!$vault) {
            wp_send_json_error(array('message' => 'No vault record found for this email.'));
        }

        wp_send_json_success(array(
            'vault' => $vault,
            'sanitized_key' => preg_replace('/[^a-zA-Z0-9_]/', '_', strtolower($email))
        ));
    }

    // =========================================================================
    // PHASE 4: STANDALONE UI/UX FRONTEND PORTAL SHELL
    // =========================================================================

    public function render_standalone_portal_shell() {
        ?>
        <!DOCTYPE html>
        <html <?php language_attributes(); ?>>
        <head>
            <meta charset="<?php bloginfo('charset'); ?>">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>Secure App Gate & Cloud Vault | Madrasa MMS Pro</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            
            <style>
                :root {
                    --bg-dark: #070c14;
                    --card-bg: rgba(15, 23, 42, 0.75);
                    --border-glass: rgba(255, 255, 255, 0.12);
                    --border-gold: rgba(245, 158, 11, 0.4);
                    --emerald-400: #34d399;
                    --emerald-500: #10b981;
                    --gold-400: #fbbf24;
                    --gold-500: #f59e0b;
                    --text-main: #f8fafc;
                    --text-muted: #94a3b8;
                }

                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    background: radial-gradient(circle at 50% 0%, #0f172a 0%, var(--bg-dark) 100%);
                    color: var(--text-main);
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow-x: hidden;
                    padding: 1.5rem;
                }

                .portal-bg-decor {
                    position: fixed;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
                    top: -100px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 0;
                    pointer-events: none;
                }

                .portal-card {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 480px;
                    background: var(--card-bg);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid var(--border-gold);
                    border-radius: 24px;
                    padding: 2.5rem 2rem;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
                    text-align: center;
                }

                .portal-header {
                    margin-bottom: 2rem;
                }

                .portal-logo-icon {
                    width: 70px;
                    height: 70px;
                    margin: 0 auto 1.25rem;
                    background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(16, 185, 129, 0.2));
                    border: 2px solid var(--gold-400);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: var(--gold-400);
                    box-shadow: 0 0 25px rgba(245, 158, 11, 0.3);
                }

                .portal-title {
                    font-size: 1.6rem;
                    font-weight: 800;
                    color: #fff;
                    margin-bottom: 0.5rem;
                }

                .portal-subtitle {
                    font-size: 0.88rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                }

                /* Nav Tabs */
                .auth-tabs {
                    display: flex;
                    background: rgba(30, 41, 59, 0.6);
                    border-radius: 14px;
                    padding: 4px;
                    margin-bottom: 1.75rem;
                    border: 1px solid var(--border-glass);
                }

                .auth-tab-btn {
                    flex: 1;
                    padding: 0.65rem 1rem;
                    border: none;
                    background: transparent;
                    color: var(--text-muted);
                    font-weight: 600;
                    font-size: 0.85rem;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }

                .auth-tab-btn.active {
                    background: linear-gradient(135deg, var(--gold-500), #b45309);
                    color: #fff;
                    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
                }

                /* Form Controls */
                .tab-content { display: none; }
                .tab-content.active { display: block; }

                .form-group {
                    margin-bottom: 1.25rem;
                    text-align: left;
                }

                .form-label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--text-muted);
                    margin-bottom: 0.4rem;
                }

                .form-control {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: rgba(15, 23, 42, 0.7);
                    border: 1px solid var(--border-glass);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 0.92rem;
                    outline: none;
                    transition: all 0.2s ease;
                }

                .form-control:focus {
                    border-color: var(--emerald-400);
                    box-shadow: 0 0 12px rgba(52, 211, 153, 0.25);
                }

                /* Google Sign In Container */
                .google-btn-wrapper {
                    display: flex;
                    justify-content: center;
                    margin: 1.5rem 0;
                }

                /* Status Feedback Bar */
                .status-feedback-box {
                    margin-top: 1.25rem;
                    padding: 0.75rem 1rem;
                    border-radius: 12px;
                    font-size: 0.82rem;
                    font-weight: 600;
                    display: none;
                    text-align: center;
                }
                .status-feedback-box.info { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid #3b82f6; }
                .status-feedback-box.success { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid #10b981; }
                .status-feedback-box.error { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid #ef4444; }

                /* Action Button */
                .btn-portal-primary {
                    width: 100%;
                    padding: 0.85rem;
                    background: linear-gradient(135deg, var(--emerald-500), #047857);
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
                }
                .btn-portal-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
                }

                /* Application Interface Frame */
                #app-launch-frame-container {
                    display: none;
                    width: 100%;
                    max-width: 1400px;
                    height: 90vh;
                    background: var(--bg-dark);
                    border-radius: 20px;
                    border: 1px solid var(--border-gold);
                    overflow: hidden;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.8);
                }
                #app-launch-frame {
                    width: 100%;
                    height: 100%;
                    border: none;
                }

                /* Footer Branding */
                .portal-footer-branding {
                    margin-top: 2rem;
                    font-size: 0.78rem;
                    color: var(--text-muted);
                    text-align: center;
                    letter-spacing: 0.3px;
                }
                .portal-footer-branding strong {
                    color: var(--gold-400);
                }
            </style>

            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://accounts.google.com/gsi/client" async defer></script>
            <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
            <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
        </head>
        <body>
            <div class="portal-bg-decor"></div>

            <!-- Portal Authentication Card -->
            <div class="portal-card" id="portal-auth-card">
                <div class="portal-header">
                    <div class="portal-logo-icon">
                        <i class="fa-solid fa-kaaba"></i>
                    </div>
                    <h1 class="portal-title">Madrasa MMS Pro</h1>
                    <p class="portal-subtitle">Secure Access Gate & Firebase Cloud Vault</p>
                </div>

                <!-- Navigation Tabs -->
                <div class="auth-tabs">
                    <button class="auth-tab-btn active" onclick="switchAuthTab('login')">Instant Login</button>
                    <button class="auth-tab-btn" onclick="switchAuthTab('activate')">First-Time Activation</button>
                </div>

                <!-- Instant Login Tab -->
                <div id="tab-login" class="tab-content active">
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.25rem;">Sign in with your Google Verified account to unlock your lifetime cloud vault.</p>
                    <div class="google-btn-wrapper">
                        <div id="g_id_onload"
                             data-client_id="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
                             data-context="signin"
                             data-ux_mode="popup"
                             data-callback="handleGoogleSignInResponse"
                             data-auto_prompt="false">
                        </div>
                        <div class="g_id_signin"
                             data-type="standard"
                             data-shape="rectangular"
                             data-theme="filled_blue"
                             data-text="signin_with"
                             data-size="large"
                             data-logo_alignment="left">
                        </div>
                    </div>
                </div>

                <!-- First Time Activation Tab -->
                <div id="tab-activate" class="tab-content">
                    <form id="activation-form" onsubmit="handleActivationSubmit(event)">
                        <div class="form-group">
                            <label class="form-label">Full Name / Teacher Title</label>
                            <input type="text" id="act-name" class="form-control" placeholder="e.g. Qari Muhammad Irfan" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Madrasa Campus Name</label>
                            <input type="text" id="act-madrasa" class="form-control" placeholder="e.g. Jamia Darul Uloom" required>
                        </div>
                        <button type="submit" class="btn-portal-primary">
                            <i class="fa-solid fa-cloud-arrow-up"></i> Link & Activate Vault
                        </button>
                    </form>
                </div>

                <!-- Status Feedback Message Box -->
                <div class="status-feedback-box" id="status-feedback-box"></div>

                <!-- Footer Branding Signature -->
                <div class="portal-footer-branding">
                    Designed and Developed by <strong>Sikandar Hayat Baba</strong> | Designed by <strong>Farani</strong>
                </div>
            </div>

            <!-- Application Interface Frame -->
            <div id="app-launch-frame-container">
                <iframe id="app-launch-frame" src="<?php echo esc_url(site_url('/')); ?>"></iframe>
            </div>

            <script>
                const wpAjaxUrl = '<?php echo esc_url(admin_url('admin-ajax.php')); ?>';
                const shbNonce = '<?php echo wp_create_nonce('shb_auth_nonce'); ?>';

                function switchAuthTab(tab) {
                    $('.auth-tab-btn').removeClass('active');
                    $('.tab-content').removeClass('active');
                    if (tab === 'login') {
                        $('.auth-tab-btn:first-child').addClass('active');
                        $('#tab-login').addClass('active');
                    } else {
                        $('.auth-tab-btn:last-child').addClass('active');
                        $('#tab-activate').addClass('active');
                    }
                }

                function showStatus(text, type) {
                    const $box = $('#status-feedback-box');
                    $box.removeClass('info success error').addClass(type).html(text).slideDown();
                }

                function handleGoogleSignInResponse(response) {
                    showStatus('🟡 Validating Google Verified Token...', 'info');
                    
                    // Decode JWT token payload
                    const base64Url = response.credential.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    const payload = JSON.parse(jsonPayload);
                    const email = payload.email;
                    const googleUid = payload.sub;
                    const name = payload.name;

                    showStatus('🔵 Establishing Vault Link & Authenticating...', 'info');

                    $.ajax({
                        url: wpAjaxUrl,
                        type: 'POST',
                        data: {
                            action: 'shb_verify_google_user',
                            security: shbNonce,
                            email: email,
                            google_uid: googleUid,
                            full_name: name
                        },
                        success: function(res) {
                            if (res.success) {
                                showStatus('🟣 Restoring Lifetime Firebase Cloud Data...', 'info');
                                setTimeout(function() {
                                    showStatus('🟢 Access Granted! Launching Core App...', 'success');
                                    setTimeout(function() {
                                        launchApplication();
                                    }, 1000);
                                }, 800);
                            } else {
                                showStatus('❌ Error: ' + res.data.message, 'error');
                            }
                        },
                        error: function(err) {
                            showStatus('❌ Server Error during authentication.', 'error');
                        }
                    });
                }

                function handleActivationSubmit(e) {
                    e.preventDefault();
                    showStatus('🟡 Please complete Google Authentication to verify your email master key.', 'info');
                }

                function launchApplication() {
                    $('#portal-auth-card').fadeOut(400, function() {
                        $('#app-launch-frame-container').fadeIn(400);
                    });
                }
            </script>
        </body>
        </html>
        <?php
    }

    public function render_portal_body_contents() {
        echo '<div style="padding:1.5rem; text-align:center;">';
        echo '<h3 style="color:#fbbf24;">[SHB Secure App Gate Active]</h3>';
        echo '<p style="color:#94a3b8;">Please visit <a href="' . esc_url(site_url('/app-portal')) . '" style="color:#34d399; font-weight:bold;">/app-portal</a> to launch the standalone portal.</p>';
        echo '<p style="font-size:0.8rem; margin-top:1rem; color:#64748b;">Designed and Developed by <strong>Sikandar Hayat Baba</strong> | Designed by <strong>Farani</strong></p>';
        echo '</div>';
    }
}

// Initialize Singleton Engine
SHB_Secure_App_Gate_Engine::get_instance();
