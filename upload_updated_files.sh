#!/usr/bin/expect -f

set timeout 60
set host "server274.hosting.reg.ru"
set user "u3256481"
set password "xV4ZcJiQ7t3IuL6G"

puts "📱 Загружаем обновленные файлы с улучшенным адаптивом..."

spawn sftp $user@$host
expect "password:"
send "$password\r"
expect "sftp>"

puts "📁 Загружаем обновленный CSS..."
send "put styles-optimized.css www/ga-dev.ru/\r"
expect "sftp>"

puts "📁 Загружаем обновленный HTML..."
send "put index.html www/ga-dev.ru/\r"
expect "sftp>"

puts "📁 Загружаем обновленный JavaScript..."
send "put script.js www/ga-dev.ru/\r"
expect "sftp>"

send "quit\r"
expect eof

puts "✅ Файлы успешно загружены!"
puts "🌐 Сайт обновлен: https://ga-dev.ru"
puts "📱 Адаптив улучшен для всех устройств!"


