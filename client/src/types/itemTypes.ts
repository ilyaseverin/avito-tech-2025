export interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  type: "Недвижимость" | "Авто" | "Услуги";
  image?: string;

  // поля для недвижимости
  propertyType?: string;
  area?: number;
  rooms?: number;
  price?: number;

  // поля для авто
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;

  // поля для услуг
  serviceType?: string;
  experience?: number;
  cost?: number;
  workSchedule?: string;
}

export type CreateItemPayload = Omit<Item, "id" | "type"> & {
  type: "" | "Недвижимость" | "Авто" | "Услуги";
};
