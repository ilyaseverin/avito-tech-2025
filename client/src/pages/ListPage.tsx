/**
 * `ListPage.tsx` — страница со списком объявлений.
 *
 * Этот компонент загружает список объявлений, позволяет фильтровать их по категориям
 * и названию, а также поддерживает пагинацию.
 *
 * @module ListPage
 */

import React, { useState } from "react";
import { useGetItemsQuery } from "../app/api/api";
import {
  Button,
  Pagination,
  MenuItem,
  Select,
  Grid2,
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { ItemCard } from "../features/components/items/ItemCard";
import { Item } from "../types/itemTypes";
import { useDebounce } from "../hooks/useDebounce";
import { useAppSelector } from "../hooks/reduxHooks";
import { Loader } from "../features/components/Loader";
import { ErrorMessage } from "../features/components/ErrorMessage";

/**
 * Компонент страницы списка объявлений.
 */
export const ListPage: React.FC = () => {
  const { data: items = [], isLoading, error } = useGetItemsQuery();
  const token = useAppSelector((state) => state.auth.token);

  // Управление состоянием фильтрации и поиска
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  // Дебаунс для оптимизации поиска
  const debouncedSearch = useDebounce(search, 500);

  /**
   * Фильтрация объявлений по названию и категории.
   * Поиск начинается только после ввода 3 и более символов.
   */
  const filteredItems = items
    .filter((item) =>
      debouncedSearch.length >= 3
        ? item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true
    )
    .filter((item) => (category ? item.type === category : true));

  // Пагинация
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredItems.length / pageSize);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    const errorMessage =
      "Произошла ошибка при загрузке объявлений. Попробуйте позже.";
    let errorCode: number | undefined;

    if (typeof error === "object" && error !== null && "status" in error) {
      errorCode = (error as { status: number }).status;
    }
    return <ErrorMessage message={errorMessage} code={errorCode} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Список объявлений
      </Typography>

      {/* Поисковая строка и фильтр */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          my: 4,
        }}
      >
        {/* Кнопка размещения объявления (доступна только авторизованным пользователям) */}
        {token && (
          <Button variant="contained" href="/form">
            Разместить объявление
          </Button>
        )}

        {/* Группа поиска и фильтрации */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            label="Поиск по названию"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disabled>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl variant="outlined" size="small" sx={{ width: 180 }}>
            <InputLabel id="category-label">Категория</InputLabel>
            <Select
              labelId="category-label"
              label="Категория"
              value={category}
              onChange={(e) => setCategory(e.target.value as string)}
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="Недвижимость">Недвижимость</MenuItem>
              <MenuItem value="Авто">Авто</MenuItem>
              <MenuItem value="Услуги">Услуги</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Если нет объявлений, показываем заглушку */}
      {filteredItems.length === 0 ? (
        <Paper
          sx={{
            mt: 4,
            p: 4,
            textAlign: "center",
            backgroundColor: "grey.50",
          }}
          elevation={0}
        >
          <SentimentDissatisfiedIcon
            sx={{ fontSize: 60, color: "text.disabled" }}
          />
          <Typography variant="h6" mt={2}>
            Объявления не найдены
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Попробуйте изменить запрос или выбрать другую категорию
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Сетка объявлений */}
          <Grid2 container spacing={2}>
            {paginatedItems.map((item: Item) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <ItemCard item={item} />
              </Grid2>
            ))}
          </Grid2>

          {/* Пагинация */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};
