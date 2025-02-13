import { useEffect } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { CreateItemPayload } from "../types/itemTypes";

const DRAFT_KEY = "itemDraft";

export const useDraft = (
  isEditMode: boolean,
  watch: UseFormWatch<CreateItemPayload>,
  setValue: UseFormSetValue<CreateItemPayload>
) => {
  // Загрузка черновика при монтировании (если не редактируем)
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

  // Сохранение черновика при изменениях формы
  useEffect(() => {
    const subscription = watch((values) => {
      if (!isEditMode) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, isEditMode]);

  // Очистка черновика
  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  return { clearDraft };
};
