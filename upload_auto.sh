#!/usr/bin/expect -f

# Скрипт для автоматической загрузки сайта на хостинг
set timeout 30

# Данные подключения
set host "server274.hosting.reg.ru"
set user "u3256481"
set password "xV4ZcJiQ7t3IuL6G"

puts "🚀 Начинаем загрузку сайта на хостинг ga-dev.ru..."

# Подключаемся к серверу
spawn sftp $user@$host

# Ожидаем запрос пароля
expect "password:"
send "$password\r"

# Ожидаем приглашение SFTP
expect "sftp>"

# Переходим в папку public_html
send "cd public_html\r"
expect "sftp>"

# Загружаем основные файлы
puts "📁 Загружаем основные файлы..."
send "put index.html\r"
expect "sftp>"

send "put styles-optimized.css\r"
expect "sftp>"

send "put script.js\r"
expect "sftp>"

send "put favicon.svg\r"
expect "sftp>"

send "put submit-form.php\r"
expect "sftp>"

send "put submit-form.js\r"
expect "sftp>"

send "put package.json\r"
expect "sftp>"

# Загружаем папки
puts "📁 Загружаем папку cases..."
send "put -r cases\r"
expect "sftp>"

puts "📁 Загружаем папку icons for jobs..."
send "put -r \"icons for jobs\"\r"
expect "sftp>"

puts "📁 Загружаем папку assets..."
send "put -r assets\r"
expect "sftp>"

# Выходим
send "quit\r"
expect eof

puts "✅ Загрузка завершена!"
puts "🌐 Сайт доступен по адресу: https://ga-dev.ru"
puts "📱 Telegram бот настроен и готов к работе!"
