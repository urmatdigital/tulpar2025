# Tulpar Logistics Dashboard

Современная панель управления для логистической компании, разработанная с использованием Next.js 14, Tailwind CSS и Supabase.

## Особенности

- 🚀 Построено на Next.js 14 с App Router
- 💅 Стилизация с помощью Tailwind CSS
- 🔐 Аутентификация через Supabase
- 📱 Адаптивный дизайн
- 🌙 Темная/светлая тема
- 🌐 Поддержка русского языка
- 📦 Управление состоянием через Zustand

## Технологии

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Zustand
- Radix UI
- Lucide Icons

## Начало работы

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/tulpar2025.git
```

2. Установите зависимости:
```bash
cd tulpar2025
npm install
```

3. Создайте файл `.env.local` и добавьте необходимые переменные окружения:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Запустите проект:
```bash
npm run dev
```

## Структура проекта

```
src/
  ├── app/              # App Router страницы
  ├── components/       # React компоненты
  │   ├── dashboard/   # Компоненты дашборда
  │   └── ui/          # UI компоненты
  ├── lib/             # Утилиты и конфигурация
  └── styles/          # Глобальные стили
```

## Лицензия

MIT
