<?php

final class Order
{
    /**
     * Charges the user and saves the order in one transaction, so either
     * everything happens or nothing does.
     *
     * @param list<array{product: array, quantity: int}> $lines from Cart::lines()
     * @return int the new order id
     * @throws RuntimeException when the cart is empty or the balance is too low
     */
    public static function place(int $userId, array $lines): int
    {
        if (!$lines) {
            throw new RuntimeException('Din varukorg är tom.');
        }

        $total = Cart::total($lines);
        $db = Database::connect();
        $db->beginTransaction();

        try {
            // The WHERE guard makes the balance check and the charge one atomic step.
            $charge = $db->prepare('UPDATE users SET credits = credits - :total WHERE id = :id AND credits >= :total');
            $charge->execute(['total' => $total, 'id' => $userId]);

            if ($charge->rowCount() === 0) {
                throw new RuntimeException('Ditt saldo räcker inte för den här beställningen.');
            }

            $db->prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)')->execute([$userId, $total]);
            $orderId = (int)$db->lastInsertId();

            $addItem = $db->prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
            foreach ($lines as $line) {
                $addItem->execute([$orderId, $line['product']['id'], $line['quantity'], $line['product']['price']]);
            }

            $db->commit();
            return $orderId;
        } catch (Throwable $e) {
            $db->rollBack();
            throw $e;
        }
    }

    /** One order with its items, or null if it doesn't belong to the user. */
    public static function findForUser(int $orderId, int $userId): ?array
    {
        $db = Database::connect();

        $stmt = $db->prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?');
        $stmt->execute([$orderId, $userId]);
        $order = $stmt->fetch();

        if (!$order) {
            return null;
        }

        $stmt = $db->prepare('
            SELECT oi.quantity, oi.price, oi.quantity * oi.price AS subtotal,
                   p.id AS product_id, p.name, p.image
            FROM order_items oi
            JOIN products p ON p.id = oi.product_id
            WHERE oi.order_id = ?
            ORDER BY oi.id
        ');
        $stmt->execute([$orderId]);
        $order['items'] = $stmt->fetchAll();

        return $order;
    }

    public static function allForUser(int $userId): array
    {
        $stmt = Database::connect()->prepare('
            SELECT o.id, o.total, o.created_at, SUM(oi.quantity) AS item_count
            FROM orders o
            JOIN order_items oi ON oi.order_id = o.id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.id DESC
        ');
        $stmt->execute([$userId]);

        return $stmt->fetchAll();
    }
}
