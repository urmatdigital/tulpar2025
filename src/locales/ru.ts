const ru = {
  navigation: {
    trackPackage: 'Отследить посылку',
    services: 'Услуги',
    about: 'О нас',
    contact: 'Контакты',
    menu: 'Меню',
  },
  auth: {
    signIn: 'Войти',
    signOut: 'Выйти',
    email: 'Email',
    password: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    noAccount: 'Нет аккаунта? Зарегистрироваться',
    createAccount: 'Создать аккаунт',
    hasAccount: 'Уже есть аккаунт? Войти',
    loginHere: 'Войти здесь',
  },
  theme: {
    light: 'Светлая',
    dark: 'Тёмная',
    system: 'Системная',
  },
  home: {
    hero: {
      title: 'Добро пожаловать в Tulpar',
      subtitle: 'Отслеживайте статус доставки в режиме реального времени',
      cta: 'Начать отслеживание',
      description: 'Современная платформа для ваших проектов',
    },
    features: {
      tracking: {
        title: 'Отслеживание в реальном времени',
        description: 'Следите за перемещением ваших посылок с точностью до минуты',
      },
      global: {
        title: 'Глобальная доставка',
        description: 'Доставляем посылки по всему миру быстро и безопасно',
      },
      support: {
        title: '24/7 Поддержка',
        description: 'Наша команда поддержки всегда готова помочь вам',
      },
      title: 'Возможности',
      list: [
        'Тёмная тема',
        'Мультиязычность',
        'Аутентификация',
        'Аналитика',
      ],
    },
  },
  dashboard: {
    stats: {
      title: 'Статистика платформы',
      users: 'Активных пользователей',
      projects: 'Выполненных проектов',
      tasks: 'Завершенных задач',
    },
  },
  stats: {
    deliveries: 'Доставок',
    countries: 'Стран',
    clients: 'Клиентов',
    satisfaction: 'Удовлетворенность',
  },
} as const

export default ru
