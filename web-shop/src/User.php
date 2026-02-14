<?php

require_once 'Database.php';

class User
{
    public static function current(): array
    {
        $db = Database::connect();
        return $db->query("SELECT * FROM users LIMIT 1")->fetch(PDO::FETCH_ASSOC);
    }

    public static function updateCredits(int $userId, int $newCredits): void
    {
        $db = Database::connect();
        $stmt = $db->prepare("UPDATE users SET credits = ? WHERE id = ?");
        $stmt->execute([$newCredits, $userId]);
    }
}
