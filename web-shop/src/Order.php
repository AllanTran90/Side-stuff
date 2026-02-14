<?php

require_once 'Database.php';

class Order
{
    public static function create(int $userId, int $total, array $cart): void
    {
        $db = Database::connect();

        $db->beginTransaction();

        $stmt = $db->prepare("INSERT INTO orders (user_id, total) VALUES (?, ?)");
        $stmt->execute([$userId, $total]);

        $orderId = $db->lastInsertId();

        foreach ($cart as $productId => $quantity) {
            $stmt = $db->prepare(
                "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)"
            );
            $stmt->execute([$orderId, $productId, $quantity]);
        }

        $db->commit();
    }
}
