#!/usr/bin/expect -f

set timeout 60
set host "server274.hosting.reg.ru"
set user "u3256481"
set password "xV4ZcJiQ7t3IuL6G"

puts "📁 Загружаем обновленные файлы кейсов..."

spawn sftp $user@$host
expect "password:"
send "$password\r"
expect "sftp>"

puts "📁 Загружаем обновленные HTML файлы кейсов..."
send "put cases/astech.html www/ga-dev.ru/cases/\r"
expect "sftp>"

send "put cases/lighteams.html www/ga-dev.ru/cases/\r"
expect "sftp>"

send "put cases/webench.html www/ga-dev.ru/cases/\r"
expect "sftp>"

send "put cases/womansy.html www/ga-dev.ru/cases/\r"
expect "sftp>"

send "put cases/edo.html www/ga-dev.ru/cases/\r"
expect "sftp>"

send "put cases/alfa.html www/ga-dev.ru/cases/\r"
expect "sftp>"

send "quit\r"
expect eof

puts "✅ Файлы кейсов успешно загружены!"
puts "🌐 Сайт обновлен: https://ga-dev.ru"
puts "📱 Исправлены пути к CSS и изображениям!"
