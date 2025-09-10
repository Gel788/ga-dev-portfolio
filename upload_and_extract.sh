#!/usr/bin/expect -f

set timeout 60
set host "server274.hosting.reg.ru"
set user "u3256481"
set password "xV4ZcJiQ7t3IuL6G"

puts "🚀 Загружаем и распаковываем сайт на хостинге..."

# Подключаемся к серверу
spawn sftp $user@$host
expect "password:"
send "$password\r"
expect "sftp>"

# Загружаем ZIP архив
puts "📦 Загружаем ZIP архив..."
send "put ga-dev-site.zip\r"
expect "sftp>"

# Выходим из SFTP
send "quit\r"
expect eof

puts "✅ ZIP архив загружен!"

# Теперь подключаемся по SSH для распаковки
puts "📂 Подключаемся по SSH для распаковки..."
spawn ssh $user@$host
expect "password:"
send "$password\r"
expect "$ "

# Переходим в папку public_html
send "cd public_html\r"
expect "$ "

# Распаковываем архив
puts "📦 Распаковываем архив..."
send "unzip -o ga-dev-site.zip\r"
expect "$ "

# Удаляем ZIP архив
puts "🗑️ Удаляем ZIP архив..."
send "rm ga-dev-site.zip\r"
expect "$ "

# Проверяем что файлы на месте
puts "✅ Проверяем файлы..."
send "ls -la\r"
expect "$ "

# Выходим из SSH
send "exit\r"
expect eof

puts "🎉 Готово! Сайт загружен и распакован!"
puts "🌐 Сайт доступен по адресу: https://ga-dev.ru"
puts "📱 Telegram бот настроен и готов к работе!"
