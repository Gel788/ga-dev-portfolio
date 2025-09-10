#!/usr/bin/expect -f

set timeout 30
set host "server274.hosting.reg.ru"
set user "u3256481"
set password "xV4ZcJiQ7t3IuL6G"

puts "🔄 Обновляем script.js на хостинге..."

spawn sftp $user@$host
expect "password:"
send "$password\r"
expect "sftp>"

send "put script.js\r"
expect "sftp>"

send "quit\r"
expect eof

puts "✅ script.js обновлен!"
