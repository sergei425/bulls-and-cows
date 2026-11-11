# Bulls and Cows — DESIGN

1. Структуры данных и алгоритмы
1.1. Секрет и попытка — строки
Хранятся как строки ('0123', '3fa0') для сохранения ведущих нулей и удобства работы с hex-цифрами.
Преобразуются в массивы: [...str].
Единый алфавит: chars = '0123456789abcdef'. Система с основанием b:chars.slice(0, b).
1.2. evaluateGuess(secret, guess)
Привести к нижнему регистру и в массив.
Быки: совпадения по позиции:
guessChars.filter((char, i) => char === secretChars[i]).length
Все совпадения: guessChars.filter(char => secretChars.includes(char)).length
Коровы = совпадения − быки.
Возвращает { bulls, cows }.
Пример: секрет 1243, попытка 1234. Быки = 2, совпадения = 4, коровы = 2.

1.3. countPossibleSecrets(length, base)
Формула: P(b, L) = b × (b−1) × ... × (b−L+1)
Рекурсия:
countPossibleSecrets(L, b) = b * countPossibleSecrets(L - 1, b - 1)
countPossibleSecrets(0, b) = 1
Кэшируется в Map<string, number> по ключу `${length}:${base}`.
Первый вызов: O(L), повторный: O(1).
1.4. generateSecret(length, base, random)
Доступные цифры: ALL_DIGITS.slice(0, base)
Вспомогательная рекурсивная функция pickDigits(available, count, random):
Если count === 0, возвращает ''
Иначе выбирает случайный символ и вызывает себя с оставшимся available и count - 1
Возвращает строку из уникальных символов.
Источник случайности — параметр random (по умолчанию Math.random). Для тестов используется детерминированная функция.

2. Сложность
Функция	Сложность
evaluateGuess	O(L)
isValidGuess	O(L)
countPossibleSecrets	O(L) (первый вызов), O(1) (повторный)
generateSecret	O(L)
3. Принципы чистого кода
Одна функция — одна задача
Понятные имена: isDigit, isValidGuess, evaluateGuess
Нет магических значений: все цифры в ALL_DIGITS
DRY: переиспользование createDigitValidator в isValidGuess
Чистые функции: не изменяют внешнее состояние
Иммутабельность: используют методы, не меняющие исходные данные
Короткие функции и простые условия
Правила проверяются автоматически:
ESLint, Prettier, Husky (lint-staged, pre-commit)
TDD: тесты пишутся до реализации
Примеры
evaluateGuess('1234', '1243') → { bulls: 2, cows: 2 }
isValidGuess('abc', 3) → false (неправильный символ)
countPossibleSecrets(3, 10) → 720
generateSecret(4, 16, () => 0) → '0123' (предсказуемый результат)
