# Инструкция по загрузке сайта на хостинг

## 📋 Данные хостинга:
- **Домен:** ga-dev.ru
- **Панель управления:** https://server274.hosting.reg.ru:1500/
- **Логин:** u3256481
- **Пароль:** xV4ZcJiQ7t3IuL6G
- **SSH/SFTP:** Доступен

## 🚀 Способы загрузки:

### Способ 1: Через SFTP (рекомендуется)
```bash
# Установка SFTP клиента (если нет)
brew install openssh

# Подключение к серверу
sftp u3256481@server274.hosting.reg.ru

# После подключения:
cd public_html
put index.html
put styles-optimized.css
put script.js
put favicon.svg
put -r cases/
put -r "icons for jobs"/
put -r assets/
put submit-form.php
put submit-form.js
put package.json
```

### Способ 2: Через панель управления
1. Откройте https://server274.hosting.reg.ru:1500/
2. Войдите с логином u3256481 и паролем xV4ZcJiQ7t3IuL6G
3. Перейдите в "Файловый менеджер"
4. Откройте папку public_html
5. Загрузите все файлы проекта

### Способ 3: Через rsync (если SSH доступен)
```bash
rsync -avz --exclude 'node_modules' --exclude '.git' \
  /Users/albertgiloan/Desktop/Ga/ \
  u3256481@server274.hosting.reg.ru:public_html/
```

## 📁 Файлы для загрузки:
- index.html
- styles-optimized.css
- script.js
- favicon.svg
- submit-form.php
- submit-form.js
- package.json
- cases/ (папка со всеми кейсами)
- "icons for jobs"/ (папка с логотипами клиентов)
- assets/ (папка с иконками)

## ⚙️ Настройка после загрузки:

### 1. Установка Node.js зависимостей (если нужен Node.js сервер)
```bash
ssh u3256481@server274.hosting.reg.ru
cd public_html
npm install
```

### 2. Настройка PHP (для submit-form.php)
- Убедитесь что PHP включен на хостинге
- Проверьте что curl расширение доступно

### 3. Проверка работы
- Откройте https://ga-dev.ru
- Протестируйте форму заявки
- Проверьте что заявки приходят в Telegram

## 🔧 Настройка домена:
1. В панели управления найдите настройки домена
2. Убедитесь что ga-dev.ru указывает на public_html
3. Настройте SSL сертификат (Let's Encrypt)

## 📱 Telegram интеграция:
- Bot Token: 8018952789:AAEXaez1JqLbFmoVUWUknIjKxREJPdzamps
- Chat ID: 143323192
- Уже настроено в submit-form.php

## 🚨 Важно:
- Не загружайте папку node_modules
- Не загружайте .git папку
- Проверьте права доступа к файлам (644 для файлов, 755 для папок)
