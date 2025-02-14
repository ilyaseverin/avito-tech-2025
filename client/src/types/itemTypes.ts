/**
 * @module itemTypes.ts
 * @remarks Определение типов данных для объявлений.
 */

/**
 * Интерфейс `Item` представляет собой объявление на платформе.
 * Включает общие поля для всех типов объявлений, а также специфические
 * свойства для недвижимости, автомобилей и услуг.
 */
export interface Item {
  /** Уникальный идентификатор объявления */
  id: number;

  /** Название объявления */
  name: string;

  /** Описание объявления */
  description: string;

  /** Локация (город, район и т. д.) */
  location: string;

  /** Тип объявления */
  type: "Недвижимость" | "Авто" | "Услуги";

  /** Опциональное изображение (ссылка) */
  image?: string;

  // 🔹 Поля для недвижимости
  /** Тип недвижимости (квартира, дом и т. д.) */
  propertyType?: string;

  /** Площадь в квадратных метрах */
  area?: number;

  /** Количество комнат */
  rooms?: number;

  /** Цена недвижимости */
  price?: number;

  // 🔹 Поля для авто
  /** Марка автомобиля */
  brand?: string;

  /** Модель автомобиля */
  model?: string;

  /** Год выпуска автомобиля */
  year?: number;

  /** Пробег автомобиля в километрах */
  mileage?: number;

  // 🔹 Поля для услуг
  /** Тип услуги (например, ремонт, курсы и т. д.) */
  serviceType?: string;

  /** Опыт работы в годах */
  experience?: number;

  /** Стоимость услуги */
  cost?: number;

  /** График работы (например, "9:00 - 18:00") */
  workSchedule?: string;
}

/**
 * Тип `CreateItemPayload` используется для создания нового объявления.
 * Исключает поле `id` (так как оно создается автоматически) и делает поле `type`
 * опциональным для случаев, когда пользователь его еще не выбрал.
 */
export type CreateItemPayload = Omit<Item, "id" | "type"> & {
  type: "" | "Недвижимость" | "Авто" | "Услуги";
};
