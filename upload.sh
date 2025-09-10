#!/bin/bash

# Скрипт для загрузки сайта на хостинг
echo "🚀 Начинаем загрузку сайта на хостинг ga-dev.ru..."

# Данные подключения
HOST="server274.hosting.reg.ru"
USER="u3256481"
REMOTE_DIR="public_html"

# Создаем временный файл с командами SFTP
cat > sftp_commands.txt << EOF
cd $REMOTE_DIR
put index.html
put styles-optimized.css
put script.js
put favicon.svg
put submit-form.php
put submit-form.js
put package.json
put -r cases
put -r "icons for jobs"
put -r assets
quit
EOF

echo "📁 Загружаем файлы через SFTP..."
sftp -b sftp_commands.txt $USER@$HOST

# Удаляем временный файл
rm sftp_commands.txt

echo "✅ Загрузка завершена!"
echo "🌐 Сайт доступен по адресу: https://ga-dev.ru"
echo "📱 Telegram бот настроен и готов к работе!"
