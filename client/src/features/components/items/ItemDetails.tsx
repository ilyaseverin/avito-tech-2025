/**
 * `ItemDetails` — компонент для отображения детальной информации об объявлении.
 *
 * @param item Объект объявления, содержащий основные данные, такие как название, изображение, описание,
 *             локация, категория, а также дополнительные характеристики в зависимости от категории объявления.
 */

import React from "react";
import { Item } from "../../../types/itemTypes";
import { Box, Container, Grid2, Typography } from "@mui/material";

/**
 * `ItemDetails` — компонент отображения подробной информации об объекте.
 *
 * @param {Item} item - Данные объявления.
 * @returns {JSX.Element} Разметка детальной информации о товаре/услуге.
 */
export const ItemDetails: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#fff", py: 4 }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          {/* Заголовок страницы */}
          <Grid2 size={{ xs: 12 }}>
            <Typography
              variant="h3"
              component="h1"
              align="left"
              gutterBottom
              sx={{ color: "#000", fontWeight: "bold" }}
            >
              {item.name}
            </Typography>
          </Grid2>

          {/* Левая колонка – картинка */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            {item.image ? (
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "auto",
                  maxHeight: "calc(100vh - 400px)",
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "300px",
                  backgroundColor: "#ccc",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Нет изображения
                </Typography>
              </Box>
            )}
          </Grid2>

          {/* Правая колонка – описание и дополнительные поля */}
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="body1"
                sx={{ color: "#333", lineHeight: 1.6 }}
              >
                {item.description}
              </Typography>

              {/* Локация и категория оформлены менее заметно */}
              <Typography variant="body1" sx={{ color: "#555" }}>
                Локация: {item.location}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Категория: {item.type}
              </Typography>

              {/* Дополнительные поля для "Недвижимость" */}
              {item.type === "Недвижимость" && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Тип недвижимости:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.propertyType}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Площадь:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.area}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Количество комнат:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.rooms}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Цена:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.price}
                    </Typography>
                  </Typography>
                </Box>
              )}

              {/* Дополнительные поля для "Авто" */}
              {item.type === "Авто" && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Марка:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.brand}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Модель:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.model}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Год выпуска:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.year}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Пробег:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.mileage}
                    </Typography>
                  </Typography>
                </Box>
              )}

              {/* Дополнительные поля для "Услуги" */}
              {item.type === "Услуги" && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Тип услуги:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.serviceType}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Опыт работы:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.experience}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    Стоимость:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.cost}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    График работы:{" "}
                    <Typography
                      component="span"
                      sx={{ color: "#000", fontWeight: 500 }}
                    >
                      {item.workSchedule}
                    </Typography>
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};
