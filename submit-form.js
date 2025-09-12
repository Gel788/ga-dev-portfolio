// Node.js сервер для отправки заявок в Telegram
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Telegram Bot Configuration
const BOT_TOKEN = '8018952789:AAEXaez1JqLbFmoVUWUknIjKxREJPdzamps';
const CHAT_ID = '143323192'; // Ваш реальный Chat ID

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Обслуживание статических файлов

// Функция для отправки сообщения в Telegram
async function sendToTelegram(formData) {
    try {
        const message = `🎯 *Новая заявка с сайта GA-DEV*

👤 *Имя:* ${formData.name}
📱 *Telegram:* ${formData.telegram}
${formData.phone ? `📞 *Телефон:* ${formData.phone}` : ''}
${formData.company ? `🏢 *Компания:* ${formData.company}` : ''}
🎯 *Тип проекта:* ${formData.projectType}
${formData.budget ? `💰 *Бюджет:* ${formData.budget}` : ''}
${formData.timeline ? `⏰ *Сроки:* ${formData.timeline}` : ''}

📝 *Описание проекта:*
${formData.message}

${formData.auditDetails ? `🔍 *Детали аудита:*
${formData.auditDetails}` : ''}

🕐 *Время заявки:* ${new Date().toLocaleString('ru-RU')}
🌐 *IP адрес:* ${formData.ip || 'Неизвестно'}`;

        const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });

        return { success: true, data: response.data };
    } catch (error) {
        console.error('Telegram API Error:', error.response?.data || error.message);
        return { success: false, error: error.message };
    }
}

// Маршрут для отправки формы
app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        
        // Валидация обязательных полей
        const requiredFields = ['name', 'telegram', 'projectType', 'message'];
        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: `Поле ${field} обязательно для заполнения`
                });
            }
        }

        // Валидация Telegram никнейма
        const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
        if (!telegramRegex.test(formData.telegram)) {
            return res.status(400).json({
                success: false,
                message: 'Некорректный формат Telegram никнейма'
            });
        }

        // Добавляем IP адрес
        formData.ip = req.ip || req.connection.remoteAddress;

        // Отправляем в Telegram
        const result = await sendToTelegram(formData);

        if (result.success) {
            res.json({ success: true, message: 'Заявка успешно отправлена!' });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Ошибка отправки заявки' 
            });
        }

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Внутренняя ошибка сервера' 
        });
    }
});

// Маршрут для проверки статуса
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Telegram Bot: @GaDigital_bot`);
    console.log(`Bot Token: ${BOT_TOKEN.substring(0, 10)}...`);
});
