# File Manager

## Описание

Этот проект реализует файловый менеджер на Node.js, работающий через CLI. Менеджер поддерживает выполнение базовых операций с файлами и папками, использование потоков для чтения/записи файлов, получение информации о системе, вычисление хеша и сжатие файлов с использованием алгоритма Brotli.

## Функциональность

- Навигация по файловой системе
- Базовые операции с файлами (чтение, копирование, перемещение, удаление и т.д.)
- Использование Stream API для операций с файлами
- Получение информации о системе (CPUs, EOL, архитектура и т.д.)
- Вычисление хеша файлов
- Сжатие и распаковка файлов с использованием алгоритма Brotli

## Требования

- Node.js версии 22.x.x или выше (рекомендуется 22.9.0 или новее)
- Поддержка командной строки (CLI)

## Установка

1. Склонируйте репозиторий:
    ```bash
    git clone https://github.com/hell-llex/node-file-manager.git
    ```

2. Перейдите в директорию проекта:
    ```bash
    cd node-file-manager
    ```

3. Установите зависимости (хотя проект не использует внешние зависимости, эта команда подготовит проект):
    ```bash
    npm install
    ```

## Запуск

Запустить файловый менеджер можно с помощью команды:

```bash
npm run start -- --username=your_username
```

- `your_username` — это ваше имя пользователя, которое будет отображаться при старте программы.

Пример:

```bash
npm run start -- --username=hell-llex
```

## Использование

После запуска программы можно выполнять команды в следующем формате:

- Навигация:
  - `up` — подняться на уровень выше в файловой системе
  - `cd path_to_directory` — перейти в указанную директорию
  - `ls` — вывести список файлов и папок в текущей директории

- Операции с файлами:
  - `cat path_to_file` — вывести содержимое файла
  - `add new_file_name` — создать пустой файл
  - `rn path_to_file new_filename` — переименовать файл
  - `cp path_to_file path_to_new_directory` — скопировать файл
  - `mv path_to_file path_to_new_directory` — переместить файл
  - `rm path_to_file` — удалить файл

- Информация о системе:
  - `os --EOL` — получить системный символ конца строки (EOL)
  - `os --cpus` — получить информацию о процессорах
  - `os --homedir` — получить домашнюю директорию текущего пользователя
  - `os --username` — получить системное имя пользователя
  - `os --architecture` — получить архитектуру системы

- Хеширование:
  - `hash path_to_file` — вычислить хеш файла

- Сжатие и распаковка:
  - `compress path_to_file path_to_destination` — сжать файл с использованием алгоритма Brotli
  - `decompress path_to_file path_to_destination` — распаковать файл

## Завершение работы

Для выхода из программы введите `.exit` или нажмите `Ctrl + C`.

## Сообщения об ошибках

- При неизвестной команде или неправильном вводе будет выведено сообщение `Invalid input`.
- Если возникла ошибка при выполнении операции, выводится сообщение `Operation failed`.
