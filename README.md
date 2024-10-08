# Проект на React (Vite) та Express

Цей проект є веб-додатком, що побудований на основі React (за допомогою Vite) для фронтенду та Express для бекенду.

## Налаштування проекту

### Вимоги

Для запуску проекту вам необхідно мати встановлене наступне програмне забезпечення:

- [Node.js](https://nodejs.org/) версії 14 або новішої
- [npm](https://www.npmjs.com/) або [yarn](https://yarnpkg.com/)

### Клонування репозиторію

```bash
git clone https://your-repository-url.git
cd your-repository-directory
Налаштування середовища
Перед запуском проекту, вам необхідно створити файли .env для фронтенду та бекенду з відповідними змінними середовища.

Фронтенд
Створіть файл .env у кореневій директорії фронтенду та додайте наступні змінні:

plaintext

API_URL=https://localhost:3001
BASE_URL=https://localhost:3001
STATIC_URL=https://localhost:3001
CHROMATIC=chpt_1dfdfe4cd7c88b7
RECAPTCHA_API_SITE_KEY="your RECAPTCHA_API_SITE_KEY"
RECAPTCHA_API_SECRET_KEY="your RECAPTCHA_API_SECRET_KEY"
Бекенд
Створіть файл .env у кореневій директорії бекенду та додайте наступні змінні:

plaintext

MAILER_USER="mail"
MAILER_PASS="app pass"
Інсталяція залежностей
Перейдіть у кореневу директорію проекту та виконайте команду для встановлення всіх необхідних залежностей:

bash

# Для фронтенду
cd frontend
npm install

# Для бекенду
cd ../backend
npm install
Запуск проекту
Після налаштування середовища та встановлення залежностей, виконайте наступні команди для запуску проекту:

Фронтенд
bash

cd frontend
npm run dev
Фронтенд буде доступний за адресою: http://localhost:5173

Бекенд
bash

cd backend
npm start
Бекенд буде доступний за адресою: http://localhost:3001

Розгортання проекту
Для розгортання проекту, вам необхідно зібрати фронтенд та налаштувати середовище для бекенду. Після цього ви можете використовувати будь-який сервер для хостингу Node.js застосунків.

Збірка фронтенду
bash

cd frontend
npm run build
Це створить оптимізовану версію проекту в директорії dist, яку ви можете розмістити на будь-якому веб-сервері.

Додаткова інформація
Для детальнішої інформації про те, як налаштувати проект або його використання, будь ласка, зверніться до документації або зв'яжіться з розробниками.

scss


Цей README допоможе налаштувати та запустити ваш проект на основі React (Vite) та Express.
```
