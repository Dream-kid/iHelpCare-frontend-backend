-- -------------------------------------------------------------
-- TablePlus 6.4.2(600)
--
-- https://tableplus.com/
--
-- Database: ihelp
-- Generation Time: 2025-04-03 18:31:12.1860
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `event_media`;
CREATE TABLE `event_media` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `event_id` bigint unsigned NOT NULL,
  `media_file` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `media_file_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `media_file_title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `media_file_title_ph` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `event_media_event_id_foreign` (`event_id`),
  CONSTRAINT `event_media_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `event_types`;
CREATE TABLE `event_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `event_type_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_type_ph` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `event_type_id` bigint unsigned NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_ph` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_en` longtext COLLATE utf8mb4_unicode_ci,
  `description_ph` longtext COLLATE utf8mb4_unicode_ci,
  `location_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location_ph` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_date_from` date DEFAULT NULL,
  `event_time_from` time DEFAULT NULL,
  `event_date_to` date DEFAULT NULL,
  `event_time_to` time DEFAULT NULL,
  `status` enum('Draft','Active','Disabled','Completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Draft',
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `events_event_type_id_foreign` (`event_type_id`),
  KEY `events_created_by_foreign` (`created_by`),
  CONSTRAINT `events_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `events_event_type_id_foreign` FOREIGN KEY (`event_type_id`) REFERENCES `event_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `model_has_permissions`;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=389 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `question_types`;
CREATE TABLE `question_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `role_has_permissions`;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `survey_multiple_choice_responses`;
CREATE TABLE `survey_multiple_choice_responses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sq_response_id` bigint unsigned NOT NULL,
  `option_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_multiple_choice_responses_sq_response_id_foreign` (`sq_response_id`),
  KEY `survey_multiple_choice_responses_option_id_foreign` (`option_id`),
  CONSTRAINT `survey_multiple_choice_responses_option_id_foreign` FOREIGN KEY (`option_id`) REFERENCES `survey_question_options` (`id`) ON DELETE CASCADE,
  CONSTRAINT `survey_multiple_choice_responses_sq_response_id_foreign` FOREIGN KEY (`sq_response_id`) REFERENCES `survey_question_responses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `survey_providers`;
CREATE TABLE `survey_providers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `var` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_text_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `btn_text_ph` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `survey_question_options`;
CREATE TABLE `survey_question_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `survey_question_id` bigint unsigned NOT NULL,
  `option_title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_title_ph` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `option_value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_question_options_survey_question_id_foreign` (`survey_question_id`),
  CONSTRAINT `survey_question_options_survey_question_id_foreign` FOREIGN KEY (`survey_question_id`) REFERENCES `survey_questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `survey_question_responses`;
CREATE TABLE `survey_question_responses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `survey_question_id` bigint unsigned NOT NULL,
  `survey_response_id` bigint unsigned NOT NULL,
  `answer` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `survey_question_responses_survey_question_id_foreign` (`survey_question_id`),
  KEY `survey_question_responses_survey_response_id_foreign` (`survey_response_id`),
  CONSTRAINT `survey_question_responses_survey_question_id_foreign` FOREIGN KEY (`survey_question_id`) REFERENCES `survey_questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `survey_question_responses_survey_response_id_foreign` FOREIGN KEY (`survey_response_id`) REFERENCES `survey_responses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `survey_questions`;
CREATE TABLE `survey_questions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `survey_id` bigint unsigned NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_ph` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tag_ph` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `question_type_id` bigint unsigned NOT NULL,
  `multi_select` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `survey_questions_survey_id_foreign` (`survey_id`),
  KEY `survey_questions_question_type_id_foreign` (`question_type_id`),
  CONSTRAINT `survey_questions_question_type_id_foreign` FOREIGN KEY (`question_type_id`) REFERENCES `question_types` (`id`),
  CONSTRAINT `survey_questions_survey_id_foreign` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `survey_responses`;
CREATE TABLE `survey_responses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `survey_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_responses_user_id_foreign` (`user_id`),
  KEY `survey_responses_survey_id_foreign` (`survey_id`),
  CONSTRAINT `survey_responses_survey_id_foreign` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE,
  CONSTRAINT `survey_responses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `surveys`;
CREATE TABLE `surveys` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description_en` longtext COLLATE utf8mb4_unicode_ci,
  `title_ph` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description_ph` longtext COLLATE utf8mb4_unicode_ci,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `participator_role` int NOT NULL DEFAULT '4',
  `status` enum('Draft','Active','Disabled','Completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Draft',
  `provider_type` bigint unsigned DEFAULT NULL,
  `survey_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `surveys_created_by_foreign` (`created_by`),
  KEY `surveys_provider_type_foreign` (`provider_type`),
  CONSTRAINT `surveys_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `surveys_provider_type_foreign` FOREIGN KEY (`provider_type`) REFERENCES `survey_providers` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `user_infos`;
CREATE TABLE `user_infos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `gender` enum('Male','Female','Others') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Male',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `blood_group` enum('O+','O-','A+','A-','B+','B-','AB+','AB-') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_infos_user_id_foreign` (`user_id`),
  CONSTRAINT `user_infos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `event_types` (`id`, `event_type_en`, `event_type_ph`, `type_value`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Online', 'Online', 'online', 1, '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(2, 'Offline', 'Offline', 'offline', 1, '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(3, 'Hybrid', 'Hybrid', 'hybrid', 1, '2024-02-13 13:40:29', '2024-02-13 13:40:29');

INSERT INTO `events` (`id`, `event_type_id`, `title_en`, `title_ph`, `description_en`, `description_ph`, `location_en`, `location_ph`, `event_date_from`, `event_time_from`, `event_date_to`, `event_time_to`, `status`, `created_by`, `created_at`, `updated_at`) VALUES
(3, 1, 'Veniam numquam labo', 'Eius tempora velit', 'Dolore commodo paria', 'Dolorem similique re', 'Tempor et culpa dic', 'Sint aliquam ea dolo', '2024-03-02', '02:02:00', '2024-03-06', '06:02:00', 'Active', 2, '2024-02-28 10:46:28', '2024-04-30 03:23:24'),
(4, 3, 'Atque odit incidunt', 'Aute et porro debiti', 'Itaque vitae nisi la', 'Cupidatat dicta solu', 'Ipsum minim anim et', 'Exercitationem repel', '2024-03-01', '08:00:00', '2024-03-05', '10:00:00', 'Active', 2, '2024-02-28 10:49:32', '2024-03-06 21:30:33'),
(5, 2, 'Assumenda reprehende', 'Sed cupiditate labor', 'Perferendis lorem su', 'In nostrum ea amet', 'Enim velit quaerat e', 'Dolor nemo aut reici', '2024-03-01', '13:00:00', '2024-03-10', '16:00:00', 'Active', 2, '2024-02-28 10:58:28', '2024-02-29 02:59:48'),
(9, 2, 'Ipsum aut dolorem e', 'Reiciendis velit sim', 'Fugiat ullamco dolor', 'Facilis rem facilis', 'Ab dolore magna veli', 'Temporibus saepe sit', '2024-02-29', '13:00:00', '2024-03-09', '17:00:00', 'Active', 2, '2024-02-28 11:29:06', '2024-02-29 02:58:31'),
(13, 2, 'Accusantium exceptur', 'Aut voluptatem Quae', 'Quod nesciunt anim', 'Qui sint dolor reic', 'Qui dolore est omni', 'Non sunt vel magni f', '2024-03-01', '08:00:00', '2024-03-05', '17:00:00', 'Active', 11, '2024-02-29 04:26:34', '2024-02-29 04:27:03'),
(14, 3, 'Sint suscipit dignis', 'Nulla pariatur Dolo', 'In placeat do occae', 'Dolor do est ipsum e', 'Voluptas possimus n', 'Ipsum duis exercitat', '2024-04-30', '08:00:00', '2024-05-10', '16:00:00', 'Active', 2, '2024-04-30 03:22:57', '2024-04-30 03:23:14'),
(15, 2, 'Nulla est sequi nob', 'Vel tenetur quidem q', 'Enim provident eum', 'Consequat Sed expli', 'Laboriosam quis qui', 'In recusandae Do pa', '2024-05-01', '08:00:00', '2024-05-11', '20:00:00', 'Active', 2, '2024-04-30 04:03:40', '2024-04-30 05:00:23'),
(16, 1, 'Dolorum consequat N', 'Distinctio Tempora', 'Qui a amet sunt tem', 'Unde facere duis ab', 'Quaerat quis tempore', 'Aliqua Libero molli', '2024-05-05', '01:00:00', '2024-05-10', '13:00:00', 'Active', 2, '2024-04-30 05:01:01', '2024-04-30 05:01:07'),
(17, 3, 'Test Event', 'Test Event', 'Test Description', 'Test Description', 'Test Location', 'Test Location', '2024-04-30', '08:00:00', '2024-05-10', '16:00:00', 'Active', 11, '2024-04-30 10:22:34', '2024-06-13 20:23:58'),
(18, 1, 'Event for test purpose', 'dgdgdfg', 'gdxgxfg', 'zdfhbzfgf', 'fgdzfgxf', 'bhfxgbfgb', '2024-06-11', '05:24:00', '2024-06-13', '10:24:00', 'Active', 11, '2024-06-13 20:24:51', '2024-06-13 20:25:09');

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_01_21_032226_create_question_types_table', 1),
(6, '2024_01_22_052534_create_user_infos_table', 1),
(7, '2024_01_22_173346_create_surveys_table', 1),
(8, '2024_01_22_173407_create_survey_questions_table', 1),
(9, '2024_01_22_173415_create_survey_question_options_table', 1),
(10, '2024_01_22_173439_create_survey_responses_table', 1),
(11, '2024_01_22_173510_create_survey_question_responses_table', 1),
(12, '2024_01_22_180320_create_survey_multiple_choice_responses_table', 1),
(13, '2024_01_22_203456_create_permission_tables', 1),
(14, '2024_01_29_115625_create_event_types_table', 1),
(15, '2024_01_29_115638_create_events_table', 1),
(16, '2024_01_29_115653_create_event_media_table', 1),
(17, '2024_02_06_154451_update_status_field_to_surveys_table', 1),
(18, '2024_02_28_132037_change_date_to_events_table', 2),
(19, '2024_02_28_173938_update_date_time_to_events_table', 3),
(20, '2024_03_13_075104_create_survey_providers_table', 4),
(21, '2024_03_15_033107_add_column_to_surveys_table', 4),
(22, '2024_03_19_095018_add_provider_column_to_surveys_table', 5),
(23, '2024_03_21_102106_add_participator_role_column_to_surveys_table', 6);

INSERT INTO `model_has_permissions` (`permission_id`, `model_type`, `model_id`) VALUES
(2, 'App\\Models\\User', 2);

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 6),
(3, 'App\\Models\\User', 9),
(3, 'App\\Models\\User', 11),
(3, 'App\\Models\\User', 13),
(3, 'App\\Models\\User', 15),
(3, 'App\\Models\\User', 19),
(3, 'App\\Models\\User', 34),
(3, 'App\\Models\\User', 35),
(4, 'App\\Models\\User', 3),
(4, 'App\\Models\\User', 4),
(4, 'App\\Models\\User', 5),
(4, 'App\\Models\\User', 7),
(4, 'App\\Models\\User', 8),
(4, 'App\\Models\\User', 10),
(4, 'App\\Models\\User', 12),
(4, 'App\\Models\\User', 14),
(4, 'App\\Models\\User', 16),
(4, 'App\\Models\\User', 17),
(4, 'App\\Models\\User', 18),
(4, 'App\\Models\\User', 36);

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('jiciyix562@mposhop.com', 'hL7rog', '2024-07-03 11:00:33');

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'dashboard', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(2, 'user.management', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(3, 'survey.create', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(4, 'survey.edit', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(5, 'survey.delete', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(6, 'survey.view', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(7, 'question.type', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(8, 'event', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(9, 'event.view', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(10, 'event.type', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29');

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(43, 'App\\Models\\User', 9, 'iHelpToken', '4128a7e43194cfcab33c6f533a7e7f31073577c946c0c7103bb9be239071dcd7', '[\"*\"]', NULL, '2024-02-26 09:52:14', '2024-02-25 09:52:14', '2024-02-25 09:52:14'),
(73, 'App\\Models\\User', 4, 'iHelpToken', 'f9785ce5764cf892b40db97d04ec687b4524018309557d1483c292e09eecef61', '[\"*\"]', '2024-02-29 04:10:59', '2024-02-29 04:40:42', '2024-02-28 04:40:42', '2024-02-29 04:10:59'),
(122, 'App\\Models\\User', 4, 'iHelpToken', '002fd1115037edd5b5b5b8e315d9ff1c81e26aa6ee7c34822a6fa644bd6b492a', '[\"*\"]', '2024-03-14 06:14:09', '2024-03-15 06:08:07', '2024-03-14 06:08:07', '2024-03-14 06:14:09'),
(251, 'App\\Models\\User', 4, 'iHelpToken', '6821064ae203af74e54da6b5d1a56f2dc22b8125aa7083b4642d1105b071150f', '[\"*\"]', NULL, '2024-04-10 05:35:06', '2024-04-09 05:35:06', '2024-04-09 05:35:06'),
(252, 'App\\Models\\User', 4, 'iHelpToken', 'dbcec22855462bfae9d3c85587ac72825207e0e1751cb8f82bc9e36796e446dd', '[\"*\"]', '2024-04-09 05:51:59', '2024-04-10 05:35:38', '2024-04-09 05:35:38', '2024-04-09 05:51:59'),
(278, 'App\\Models\\User', 19, 'iHelpToken', 'd22c6ae7ff3e34a1f60078304e8c3f4412789e8d010460968a792d16a44d9e3d', '[\"*\"]', NULL, '2024-05-14 13:28:05', '2024-05-13 13:28:05', '2024-05-13 13:28:05'),
(290, 'App\\Models\\User', 1, 'iHelpToken', '6aa7bf9f9e9208808eab82b717417ac0ea9d6aee22685fafa34226ca421dee9b', '[\"*\"]', '2024-05-29 08:32:20', '2024-05-30 08:27:47', '2024-05-29 08:27:47', '2024-05-29 08:32:20'),
(327, 'App\\Models\\User', 30, 'iHelpToken', '9bd5a567876388723e47534719eba52b83a8973f3b2161bbb816569f2338802f', '[\"*\"]', NULL, '2024-06-13 08:13:22', '2024-06-12 08:13:22', '2024-06-12 08:13:22'),
(336, 'App\\Models\\User', 13, 'iHelpToken', '8e04bed6f3b2c4a22a7b9474073497950c43856699ce29a6799c38dca8311707', '[\"*\"]', '2024-06-12 18:28:08', '2024-06-13 17:13:39', '2024-06-12 17:13:39', '2024-06-12 18:28:08'),
(343, 'App\\Models\\User', 13, 'iHelpToken', '460b80396abbd94fba298b56c6d8a76995b0ad6ca1df0ba96af8ebc5d5cea227', '[\"*\"]', '2024-06-12 19:10:04', '2024-06-13 19:04:08', '2024-06-12 19:04:08', '2024-06-12 19:10:04'),
(356, 'App\\Models\\User', 34, 'iHelpToken', 'd59adf517787858936f5f995220944dcdd1b0e6305f0256482c30915a814ec49', '[\"*\"]', NULL, '2024-06-14 20:56:54', '2024-06-13 20:56:54', '2024-06-13 20:56:54'),
(357, 'App\\Models\\User', 34, 'iHelpToken', '5e29933806409d758dc28afa243b1bf390ea2a4159b12a070671da90b9271489', '[\"*\"]', '2024-06-13 21:00:53', '2024-06-14 20:58:12', '2024-06-13 20:58:12', '2024-06-13 21:00:53'),
(361, 'App\\Models\\User', 13, 'iHelpToken', '9709829689a63eab707f188e083a9840d1ae9ab6349e63b40265c34268fd21d2', '[\"*\"]', '2024-06-26 18:26:18', '2024-06-27 18:26:13', '2024-06-26 18:26:13', '2024-06-26 18:26:18'),
(362, 'App\\Models\\User', 13, 'iHelpToken', '740e90ce36fddc0540cb4d361c110b6361fd6665f2e763529dfb39540e1c4e3a', '[\"*\"]', NULL, '2024-06-27 18:27:06', '2024-06-26 18:27:06', '2024-06-26 18:27:06'),
(363, 'App\\Models\\User', 13, 'iHelpToken', '13616da6b06dd1e853edd59ebc1497f97223ddd1d8e491e18c7bd68000e7ba9e', '[\"*\"]', NULL, '2024-06-27 18:28:44', '2024-06-26 18:28:44', '2024-06-26 18:28:44'),
(364, 'App\\Models\\User', 13, 'iHelpToken', '89bad9a369d6648985b33b2bb9b16e55a8f4e99c964ebc9b40703793f539443f', '[\"*\"]', NULL, '2024-06-27 18:30:57', '2024-06-26 18:30:57', '2024-06-26 18:30:57'),
(365, 'App\\Models\\User', 13, 'iHelpToken', '50073510a3c5e42f35f4bae8649251812054e7ee100a0bb971afc193170ce9a0', '[\"*\"]', NULL, '2024-06-27 18:40:32', '2024-06-26 18:40:32', '2024-06-26 18:40:32'),
(366, 'App\\Models\\User', 13, 'iHelpToken', '8cc882b26e89d49cd4a496c2115e1131260c1877586685808c3d964ce83c9099', '[\"*\"]', NULL, '2024-06-27 18:41:14', '2024-06-26 18:41:14', '2024-06-26 18:41:14'),
(367, 'App\\Models\\User', 13, 'iHelpToken', '91d563ea5fd40e9e4b97db88bed7a44597a169c088a9224fe445143fb102cc79', '[\"*\"]', NULL, '2024-06-27 18:42:53', '2024-06-26 18:42:53', '2024-06-26 18:42:53'),
(368, 'App\\Models\\User', 13, 'iHelpToken', 'c6ef987fdaa82487ee1b4fc295c1687bfc5b6b502f3f80a7a47e24881b941ef4', '[\"*\"]', NULL, '2024-06-27 18:46:52', '2024-06-26 18:46:52', '2024-06-26 18:46:52'),
(369, 'App\\Models\\User', 13, 'iHelpToken', '44831ba7294b5cab86665f4b5bc99c901b576fd58d8e358932cb269e02b2862b', '[\"*\"]', '2024-06-26 19:41:27', '2024-06-27 18:55:21', '2024-06-26 18:55:21', '2024-06-26 19:41:27'),
(370, 'App\\Models\\User', 13, 'iHelpToken', '64be9a5089fd43fc90a23ddd1640dbf537c84bca9171b61c7efc2689876cfc0d', '[\"*\"]', '2024-06-26 20:20:38', '2024-06-27 20:12:34', '2024-06-26 20:12:34', '2024-06-26 20:20:38'),
(371, 'App\\Models\\User', 13, 'iHelpToken', 'fd6d53d857a62355000bffa0efef40856de59ace794888f55711d6357b426f49', '[\"*\"]', NULL, '2024-06-27 20:39:59', '2024-06-26 20:39:59', '2024-06-26 20:39:59'),
(384, 'App\\Models\\User', 4, 'iHelpToken', 'c0989a31b7ed131e8ab33106b3e0de94519dafc160d40feca86e456697fd04b6', '[\"*\"]', NULL, '2024-07-19 09:34:04', '2024-07-18 09:34:04', '2024-07-18 09:34:04'),
(385, 'App\\Models\\User', 36, 'iHelpToken', '1d0f35079b3f5d0d3af0b8b90b888e20f8953aeaeb9d0e8afb756c70ff6a32a5', '[\"*\"]', '2025-03-12 09:27:04', '2025-03-13 04:32:30', '2025-03-12 04:32:30', '2025-03-12 09:27:04'),
(388, 'App\\Models\\User', 3, 'iHelpToken', 'f1fc7cdb206e39f9d3d9f0ed101baa08537c172872f5a8004029ae159cb74f5e', '[\"*\"]', NULL, '2025-04-03 06:13:00', '2025-04-02 06:13:00', '2025-04-02 06:13:00');

INSERT INTO `question_types` (`id`, `type`, `value`, `status`, `created_at`, `updated_at`) VALUES
(1, 'MCQ', 'mcq', 1, '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(2, 'Binary', 'binary', 1, '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(3, 'Input', 'input', 1, '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(4, 'Scale', 'scale', 1, '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(5, 'Essay', 'essay', 1, '2024-02-13 13:40:29', '2024-02-13 13:40:29');

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'SuperAdmin', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(2, 'Admin', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(3, 'CareGiver', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(4, 'Patient', 'web', '2024-02-13 13:40:29', '2024-02-13 13:40:29');

INSERT INTO `survey_providers` (`id`, `var`, `title`, `btn_text_en`, `btn_text_ph`, `status`, `created_at`, `updated_at`) VALUES
(1, 'native', 'Native', 'Create From Native Survey', 'Lumikha Mula sa Native Survey', 1, '2024-03-15 11:39:53', '2024-03-15 11:39:53'),
(2, 'qualtrics', 'Qualtrics', 'Create From Qualtrics', 'Lumikha Mula sa Qualtrics', 1, '2024-03-15 11:40:26', '2024-03-15 11:40:26'),
(3, 'sm', 'SurveyMonkey', 'Create From SurveyMonkey', 'Lumikha Mula sa SurveyMonkey', 0, '2024-03-15 11:40:58', '2024-03-15 11:40:58');

INSERT INTO `survey_question_responses` (`id`, `survey_question_id`, `survey_response_id`, `answer`) VALUES
(1, 27, 1, 'AAA'),
(2, 28, 1, 'AAA'),
(3, 29, 1, 'AAA'),
(4, 27, 2, 'AA'),
(5, 28, 2, 'BB'),
(6, 29, 2, 'CC');

INSERT INTO `survey_questions` (`id`, `survey_id`, `title_en`, `tag_en`, `title_ph`, `tag_ph`, `question_type_id`, `multi_select`) VALUES
(27, 17, 'Did you face any issues while using this system?', 'test', 'Did you face any issues while using this system?', 'test', 5, 0),
(28, 17, 'How can we improve our system?', 'test', 'How can we improve our system?', 'test', 5, 0),
(29, 17, 'Are you satisfied with our system?', 'test', 'Are you satisfied with our system?', 'test', 5, 0);

INSERT INTO `survey_responses` (`id`, `user_id`, `survey_id`, `created_at`, `updated_at`) VALUES
(1, 3, 17, '2024-04-04 09:09:53', '2024-04-04 09:09:53'),
(2, 18, 17, '2024-04-09 05:20:02', '2024-04-09 05:20:02'),
(3, 13, 20, '2024-06-12 19:10:04', '2024-06-12 19:10:04');

INSERT INTO `surveys` (`id`, `title_en`, `description_en`, `title_ph`, `description_ph`, `start_date`, `end_date`, `participator_role`, `status`, `provider_type`, `survey_link`, `created_by`, `created_at`, `updated_at`) VALUES
(10, 'user feedback', 'about usability of application', 'ffdgdf', 'fbdfg', '2024-03-19 00:00:00', '2024-03-25 00:00:00', 4, 'Active', 2, 'https://kennesaw.co1.qualtrics.com/jfe/form/SV_d13I3Gs6HTc7SRw', 2, '2024-03-20 19:46:57', '2024-03-20 19:47:08'),
(11, 'Harum sit qui earum 1', NULL, NULL, NULL, '2024-03-22 09:24:51', '2024-03-22 09:24:51', 4, 'Active', NULL, NULL, 1, '2024-03-20 20:46:50', '2024-03-22 09:24:51'),
(12, 'Harum sit qui earum', NULL, NULL, NULL, '2024-03-22 09:26:16', '2024-03-22 09:26:16', 3, 'Active', NULL, NULL, 1, '2024-03-22 09:01:50', '2024-03-27 03:01:10'),
(17, 'System review', 'Give a review to our system', 'System review', 'Give a review to our system', '2024-03-24 00:00:00', '2024-04-30 00:00:00', 4, 'Active', 1, NULL, 2, '2024-03-25 06:33:51', '2024-03-25 06:34:18'),
(20, 'Dementia Knowledge Survey for Nurses', 'Enhance understanding among Filipino and Filipino American nurses. Confidential, voluntary, 15-minute study.', 'Dementia Knowledge Survey for Nurses', 'Enhance understanding among Filipino and Filipino American nurses. Confidential, voluntary, 15-minute study.', '2024-06-12 00:00:00', '2024-09-30 00:00:00', 3, 'Active', 2, 'https://kennesaw.co1.qualtrics.com/jfe/form/SV_7NUwkMvnDrzFgCa', 2, '2024-06-12 18:56:48', '2024-06-12 18:56:56');

INSERT INTO `user_infos` (`id`, `user_id`, `gender`, `phone`, `date_of_birth`, `blood_group`, `street`, `city`, `state`, `postal_code`, `country`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(2, 3, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-14 04:25:37', '2024-02-14 04:25:37'),
(3, 4, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-14 05:20:24', '2024-02-14 05:20:24'),
(4, 5, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-14 05:54:18', '2024-02-14 05:54:18'),
(5, 6, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-25 06:19:22', '2024-02-25 06:19:22'),
(6, 7, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-25 07:06:50', '2024-02-25 07:06:50'),
(7, 8, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-25 09:51:10', '2024-02-25 09:51:10'),
(8, 9, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-25 09:52:02', '2024-02-25 09:52:02'),
(9, 10, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-27 02:45:49', '2024-02-27 02:45:49'),
(10, 11, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-27 03:40:32', '2024-02-27 03:40:32'),
(11, 12, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-05 11:59:35', '2024-03-05 11:59:35'),
(12, 13, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-03-21 07:05:49', '2024-03-21 07:05:49'),
(13, 14, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-04 05:07:11', '2024-04-04 05:07:11'),
(14, 15, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-04 05:45:36', '2024-04-04 05:45:36'),
(15, 16, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-04 06:05:22', '2024-04-04 06:05:22'),
(16, 17, 'Male', NULL, '2024-06-12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-04 10:37:46', '2024-06-12 11:06:20'),
(17, 18, 'Male', '+1 (322) 177-7566', '2024-06-12', 'AB+', NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-09 05:17:18', '2024-06-12 11:06:29'),
(18, 19, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-09 05:22:45', '2024-04-09 05:22:45'),
(19, 20, 'Male', NULL, NULL, 'B-', 'Voluptate incididunt', NULL, NULL, NULL, NULL, NULL, '2024-05-29 10:02:16', '2024-05-29 10:02:16'),
(20, 21, 'Male', '+1 (586) 762-4257', '2024-05-29', 'A+', 'Sint occaecat mollit', NULL, NULL, NULL, NULL, NULL, '2024-05-29 10:02:55', '2024-05-29 10:49:15'),
(21, 22, 'Male', '+1 (499) 231-6432', '2024-05-29', 'B-', 'Similique nesciunt', NULL, NULL, NULL, NULL, NULL, '2024-05-29 10:56:32', '2024-05-29 10:56:32'),
(33, 34, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-13 20:56:24', '2024-06-13 20:56:24'),
(34, 35, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-03 09:41:29', '2024-07-03 09:41:29'),
(35, 36, 'Male', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-03-12 04:32:26', '2025-03-12 04:32:26');

INSERT INTO `users` (`id`, `name`, `first_name`, `last_name`, `email`, `email_verified_at`, `password`, `role_id`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'Super', 'Admin', 'admin@admin.com', NULL, '$2y$12$O6rVf90PDaErOL5DPkpW9O5AEbuoE0tJhS/E76nKxqP/Wx9eOisGu', 1, 1, NULL, '2024-02-13 13:40:29', '2024-02-13 13:40:29'),
(2, 'iHelp Admin', 'iHelp', 'Admin', 'admin@ihelp.com', NULL, '$2y$12$VwHlQz0t4YDL2bCpAtyNhuxIxWkjjgVvs8gXzNDz1hZYen.0nohfC', 2, 1, NULL, '2024-02-02 06:01:44', '2024-02-02 06:01:44'),
(3, 'Test Patient 01', 'Test Patient', '01', 'testpatient01@ihelp.com', NULL, '$2y$12$H3WXAxX6GpLxdz8lCv4cxe.rZSjao00x5UHkqgCk4KfEBSUG5Ekde', 4, 1, NULL, '2024-02-14 04:25:37', '2024-02-14 04:25:37');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
