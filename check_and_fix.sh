#!/usr/bin/expect -f

set timeout 60
set host "server274.hosting.reg.ru"
set user "u3256481"
set password "xV4ZcJiQ7t3IuL6G"

puts "🔍 Проверяем структуру папок на сервере..."

spawn ssh $user@$host
expect "password:"
send "$password\r"
expect "$ "

# Проверяем текущую папку
send "pwd\r"
expect "$ "

# Смотрим что есть в корне
send "ls -la\r"
expect "$ "

# Проверяем папку www
send "ls -la www/\r"
expect "$ "

# Перемещаем файлы в папку www
puts "📁 Перемещаем файлы в папку www..."
send "mv index.html www/\r"
expect "$ "

send "mv styles-optimized.css www/\r"
expect "$ "

send "mv script.js www/\r"
expect "$ "

send "mv favicon.svg www/\r"
expect "$ "

send "mv submit-form.php www/\r"
expect "$ "

send "mv submit-form.js www/\r"
expect "$ "

send "mv package.json www/\r"
expect "$ "

send "mv -r cases www/\r"
expect "$ "

send "mv -r \"icons for jobs\" www/\r"
expect "$ "

send "mv -r assets www/\r"
expect "$ "

# Проверяем что файлы перемещены
puts "✅ Проверяем что файлы перемещены..."
send "ls -la www/\r"
expect "$ "

# Выходим из SSH
send "exit\r"
expect eof

puts "🎉 Файлы перемещены в папку www!"
puts "🌐 Сайт должен быть доступен по адресу: https://ga-dev.ru"
