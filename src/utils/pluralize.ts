/**
 * Функция для склонения слов в зависимости от числа
 * @param {number} number - Число
 * @param {string[]} words - Массив из трех форм слова:
 *   [0] - форма для числа 1 (1 ресурс)
 *   [1] - форма для чисел 2-4 (2 ресурса)
 *   [2] - форма для остальных случаев (5 ресурсов)
 * @returns {string} Строка с числом и правильной формой слова
 */
export function pluralize(num: number, words: string[]) {
  // Проверяем корректность входных данных
  if (!Array.isArray(words) || words.length !== 3) {
    throw new Error("Words must be an array of 3 strings");
  }

  if (typeof num !== "number" || !Number.isInteger(num)) {
    throw new Error("Number must be an integer");
  }

  const absNumber = Math.abs(num);
  const lastTwoDigits = absNumber % 100;
  const lastDigit = absNumber % 10;

  // Исключения для чисел 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${num} ${words[2]}`;
  }

  // Для чисел, оканчивающихся на 1 (кроме 11)
  if (lastDigit === 1) {
    return `${num} ${words[0]}`;
  }

  // Для чисел, оканчивающихся на 2, 3, 4 (кроме 12-14)
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${num} ${words[1]}`;
  }

  // Для всех остальных случаев
  return `${num} ${words[2]}`;
}
