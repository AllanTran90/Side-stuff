<?php

/**
 * There is no login yet, so the shop always acts as the first user.
 */
final class User
{
    public static function current(): array
    {
        $user = Database::connect()->query('SELECT * FROM users ORDER BY id LIMIT 1')->fetch();

        if (!$user) {
            throw new RuntimeException('No user found. Delete webshop.sqlite to rebuild the database.');
        }

        return $user;
    }
}
