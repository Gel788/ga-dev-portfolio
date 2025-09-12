#!/usr/bin/expect -f

set timeout 60
set host "server274.hosting.reg.ru"
set user "u3256481"
set password "xV4ZcJiQ7t3IuL6G"

puts "📄 Загружаем markdown файлы на хостинг..."

spawn sftp $user@$host
expect "password:"
send "$password\r"
expect "sftp>"

puts "📄 Загружаем markdown файлы..."
send "put cases/Alfa.md www/ga-dev.ru/cases/\r"
expect "sftp>"

send "put cases/EDO.md www/ga-dev.ru/cases/\r"
expect "sftp>"

send "put cases/LighTeams/LighTeams.md www/ga-dev.ru/cases/LighTeams/\r"
expect "sftp>"

send "put cases/Womansy/Womansy.md www/ga-dev.ru/cases/Womansy/\r"
expect "sftp>"

send "put cases/Astech/описание.md www/ga-dev.ru/cases/Astech/\r"
expect "sftp>"

send "put cases/WeBench/описание.md www/ga-dev.ru/cases/WeBench/\r"
expect "sftp>"

send "put cases/AmadentM/описание.md www/ga-dev.ru/cases/AmadentM/\r"
expect "sftp>"

send "put cases/Action360/описание.md www/ga-dev.ru/cases/Action360/\r"
expect "sftp>"

send "quit\r"
expect eof

puts "✅ Markdown файлы успешно загружены!"
puts "🌐 Теперь markdown содержимое будет загружаться!"
