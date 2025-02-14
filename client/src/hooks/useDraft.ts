/**
 * `useDraft.ts` — хук для сохранения черновика формы в `localStorage`.
 *
 * Этот хук автоматически загружает черновик данных при монтировании
 * (если не редактируется существующая запись), следит за изменениями формы
 * и сохраняет их в `localStorage`, а также предоставляет функцию очистки черновика.
 *
 * @param {boolean} isEditMode - Флаг, указывающий, редактируется ли существующий объект.
 * @param {UseFormWatch<CreateItemPayload>} watch - Функция для отслеживания изменений формы.
 * @param {UseFormSetValue<CreateItemPayload>} setValue - Функция для установки значений полей формы.
 * @returns {Object} Объект с функцией `clearDraft`, которая удаляет черновик из `localStorage`.
 *
 * @example
 * const { clearDraft } = useDraft(isEditMode, watch, setValue);
 */

import { useEffect } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { CreateItemPayload } from "../types/itemTypes";

const DRAFT_KEY = "itemDraft";

export const useDraft = (
  isEditMode: boolean,
  watch: UseFormWatch<CreateItemPayload>,
  setValue: UseFormSetValue<CreateItemPayload>
) => {
  // Загружаем черновик из localStorage при монтировании (если это не режим редактирования)
  useEffect(() => {
    if (!isEditMode) {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          Object.keys(parsed).forEach((key) => {
            setValue(key as keyof CreateItemPayload, parsed[key]);
          });
        } catch (error) {
          console.error("Ошибка загрузки черновика:", error);
        }
      }
    }
  }, [isEditMode, setValue]);

  // Автоматическое сохранение черновика при изменении значений формы
  useEffect(() => {
    const subscription = watch((values) => {
      if (!isEditMode) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, isEditMode]);

  // Функция очистки черновика
  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  return { clearDraft };
};
