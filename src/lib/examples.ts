import { adminApi } from './supabaseAdmin'

// Примеры использования админ API

async function userManagementExamples() {
  // Создание нового пользователя
  const newUser = await adminApi.users.createUser({
    telegram_id: '123456789',
    username: 'john_doe',
    full_name: 'John Doe',
    role: 'user'
  })

  // Обновление пользователя
  await adminApi.users.updateUser(newUser.id, {
    phone: '+996555123456'
  })

  // Получение всех пользователей
  const allUsers = await adminApi.users.getAllUsers()
}

async function packageManagementExamples() {
  // Создание новой посылки
  const newPackage = await adminApi.packages.createPackage({
    tracking_number: 'TLP123456',
    status: 'registered',
    current_location: 'Бишкек',
    weight: 2.5,
    description: 'Тестовая посылка'
  })

  // Обновление статуса посылки
  await adminApi.packages.updatePackage(newPackage.id, {
    status: 'in_transit',
    current_location: 'Ош'
  })

  // Добавление записи в историю отслеживания
  await adminApi.tracking.addTrackingEntry({
    package_id: newPackage.id,
    status: 'in_transit',
    location: 'Ош',
    notes: 'Посылка в пути'
  })

  // Получение истории посылки
  const trackingHistory = await adminApi.tracking.getPackageHistory(newPackage.id)
}

async function storageExamples() {
  // Создание нового бакета
  await adminApi.storage.createBucket('documents', true)

  // Загрузка файла
  const file = new File(['Hello, World!'], 'test.txt', { type: 'text/plain' })
  await adminApi.storage.uploadFile('documents', 'test.txt', file)

  // Получение списка файлов
  const files = await adminApi.storage.listFiles('documents')
}

async function databaseManagementExamples() {
  // Создание новой таблицы
  await adminApi.database.createTable('custom_table', {
    id: 'uuid PRIMARY KEY DEFAULT uuid_generate_v4()',
    name: 'text NOT NULL',
    created_at: 'timestamp with time zone DEFAULT CURRENT_TIMESTAMP'
  })

  // Изменение таблицы
  await adminApi.database.alterTable(
    'custom_table',
    'ADD COLUMN description text'
  )
}
