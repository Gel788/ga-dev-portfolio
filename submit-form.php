<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Telegram Bot Configuration
$BOT_TOKEN = '8018952789:AAEXaez1JqLbFmoVUWUknIjKxREJPdzamps';
$CHAT_ID = '143323192'; // Ваш реальный Chat ID

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Получаем данные из POST запроса
$input = json_decode(file_get_contents('php://input'), true);

// Валидация обязательных полей
$required_fields = ['name', 'telegram', 'projectType', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Поле {$field} обязательно для заполнения"]);
        exit;
    }
}

// Формируем сообщение для Telegram
$message = "🎯 *Новая заявка с сайта GA-DEV*\n\n";
$message .= "👤 *Имя:* " . htmlspecialchars($input['name']) . "\n";
$message .= "📱 *Telegram:* " . htmlspecialchars($input['telegram']) . "\n";

if (!empty($input['phone'])) {
    $message .= "📞 *Телефон:* " . htmlspecialchars($input['phone']) . "\n";
}

if (!empty($input['company'])) {
    $message .= "🏢 *Компания:* " . htmlspecialchars($input['company']) . "\n";
}

$message .= "🎯 *Тип проекта:* " . htmlspecialchars($input['projectType']) . "\n";

if (!empty($input['budget'])) {
    $message .= "💰 *Бюджет:* " . htmlspecialchars($input['budget']) . "\n";
}

if (!empty($input['timeline'])) {
    $message .= "⏰ *Сроки:* " . htmlspecialchars($input['timeline']) . "\n";
}

$message .= "\n📝 *Описание проекта:*\n" . htmlspecialchars($input['message']) . "\n";

if (!empty($input['auditDetails'])) {
    $message .= "\n🔍 *Детали аудита:*\n" . htmlspecialchars($input['auditDetails']) . "\n";
}

$message .= "\n🕐 *Время заявки:* " . date('d.m.Y H:i:s') . "\n";
$message .= "🌐 *IP адрес:* " . $_SERVER['REMOTE_ADDR'];

// Отправляем сообщение в Telegram
$telegram_url = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";
$telegram_data = [
    'chat_id' => $CHAT_ID,
    'text' => $message,
    'parse_mode' => 'Markdown',
    'disable_web_page_preview' => true
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

if ($http_code === 200) {
    $response_data = json_decode($response, true);
    if ($response_data['ok']) {
        echo json_encode(['success' => true, 'message' => 'Заявка успешно отправлена!']);
    } else {
        error_log("Telegram API Error: " . $response);
        echo json_encode([
            'success' => false, 
            'message' => 'Ошибка отправки в Telegram: ' . ($response_data['description'] ?? 'Неизвестная ошибка')
        ]);
    }
} else {
    error_log("HTTP Error: " . $http_code . " Response: " . $response);
    echo json_encode([
        'success' => false, 
        'message' => 'Ошибка соединения с Telegram (HTTP ' . $http_code . ')'
    ]);
}
?>
