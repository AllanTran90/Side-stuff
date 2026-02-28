<?php

require_once 'Database.php';

class Order
{
    public static function create(int $userId, int $total, array $cart): void
    {
        $db = Database::connect();

        // skapa order
        $stmt = $db->prepare("INSERT INTO orders (user_id, total) VALUES (?, ?)");
        $stmt->execute([$userId, $total]);

        $orderId = $db->lastInsertId();

        // skapa order_items
        foreach ($cart as $productId => $quantity) {
            $stmt = $db->prepare("
                INSERT INTO order_items (order_id, product_id, quantity)
                VALUES (?, ?, ?)
            ");
            $stmt->execute([$orderId, $productId, $quantity]);
        }
    }

     public static function getByUser(int $userId): array
    {
        $db = Database::connect();

        $stmt = $db->prepare("
            SELECT o.id AS order_id,
                   o.total,
                   o.created_at,
                   p.name,
                   p.price,
                   oi.quantity
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        ");

        $stmt->execute([$userId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

