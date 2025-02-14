/**
 * `useDebounce.ts` — кастомный хук для реализации debounce (задержки выполнения).
 *
 * Этот хук принимает значение и задержку, обновляя `debouncedValue`
 * только спустя указанный интервал времени после последнего изменения `value`.
 *
 * @template T - Тип значения, которое будет дебаунситься.
 * @param {T} value - Исходное значение, которое требуется задержать.
 * @param {number} delay - Время задержки в миллисекундах.
 * @returns {T} - Дебаунсированное значение.
 *
 * @example
 * const searchTerm = useDebounce(inputValue, 500);
 * useEffect(() => {
 *   fetchData(searchTerm);
 * }, [searchTerm]);
 */

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  // Локальное состояние для хранения задержанного значения
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Устанавливаем таймер для обновления значения после задержки
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаем предыдущий таймер при изменении `value` или `delay`
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
