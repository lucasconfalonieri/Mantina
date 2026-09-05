-- Adds real role-based access control for the backoffice, replacing the
-- hardcoded `id_user IN (19, 20)` check that was the only thing gating
-- access to the admin panel (routes/login.js, POST /login/signina).
--
-- Safe to re-run: the ADD COLUMN is guarded, and the UPDATE only ever
-- affects the two known legacy admin accounts.

ALTER TABLE `users`
  ADD COLUMN IF NOT EXISTS `is_admin` TINYINT(1) NOT NULL DEFAULT 0 AFTER `name`;

UPDATE `users` SET `is_admin` = 1 WHERE `id_user` IN (19, 20);
