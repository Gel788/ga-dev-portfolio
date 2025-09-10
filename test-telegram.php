<?php
// Простой тест отправки в Telegram
$BOT_TOKEN = '8018952789:AAEXaez1JqLbFmoVUWUknIjKxREJPdzamps';
$CHAT_ID = '143323192';

$message = "🧪 Тестовое сообщение от GA-DEV бота\n\nВремя: " . date('d.m.Y H:i:s');

$telegram_url = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";
$telegram_data = [
    'chat_id' => $CHAT_ID,
    'text' => $message,
    'parse_mode' => 'Markdown'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $telegram_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($telegram_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: " . $http_code . "\n";
echo "Response: " . $response . "\n";

if ($http_code === 200) {
    $response_data = json_decode($response, true);
    if ($response_data['ok']) {
        echo "✅ Сообщение отправлено успешно!\n";
    } else {
        echo "❌ Ошибка Telegram API: " . $response_data['description'] . "\n";
    }
} else {
    echo "❌ HTTP Error: " . $http_code . "\n";
}
?>
