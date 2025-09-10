#!/usr/bin/expect -f

set timeout 60
set host "server274.hosting.reg.ru"
set user "u3256481"
set password "xV4ZcJiQ7t3IuL6G"

puts "📁 Перемещаем файлы в папку ga-dev.ru..."

spawn ssh $user@$host
expect "password:"
send "$password\r"
expect "$ "

# Перемещаем файлы из www в www/ga-dev.ru
send "mv www/index.html www/ga-dev.ru/\r"
expect "$ "

send "mv www/styles-optimized.css www/ga-dev.ru/\r"
expect "$ "

send "mv www/script.js www/ga-dev.ru/\r"
expect "$ "

send "mv www/favicon.svg www/ga-dev.ru/\r"
expect "$ "

send "mv www/submit-form.php www/ga-dev.ru/\r"
expect "$ "

send "mv www/submit-form.js www/ga-dev.ru/\r"
expect "$ "

send "mv www/package.json www/ga-dev.ru/\r"
expect "$ "

# Перемещаем папки
send "mv cases www/ga-dev.ru/\r"
expect "$ "

send "mv \"icons for jobs\" www/ga-dev.ru/\r"
expect "$ "

send "mv assets www/ga-dev.ru/\r"
expect "$ "

# Проверяем что файлы перемещены
puts "✅ Проверяем содержимое папки ga-dev.ru..."
send "ls -la www/ga-dev.ru/\r"
expect "$ "

# Выходим из SSH
send "exit\r"
expect eof

puts "🎉 Файлы перемещены в папку ga-dev.ru!"
puts "🌐 Сайт должен быть доступен по адресу: https://ga-dev.ru"
