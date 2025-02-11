// src/pages/ListPage.tsx

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
import { ItemCard } from "../features/items/components/ItemCard";
import { Item } from "../types/itemTypes";
import { useDebounce } from "../hooks/useDebounce";

export const ListPage: React.FC = () => {
  const { data: items = [], isLoading, error } = useGetItemsQuery();

  // Поиск
  const [search, setSearch] = useState("");
  // Фильтр категории
  const [category, setCategory] = useState("");
  // Текущая страница
  const [page, setPage] = useState(1);

  // Используем свой хук для debounce
  const debouncedSearch = useDebounce(search, 500);

  // Фильтруем items по поиску и категории
  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((item) => (category ? item.type === category : true));

  // Пагинация
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredItems.length / pageSize);

  // Состояние загрузки/ошибки
  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Загрузка...
        </Typography>
      </Container>
    );
  }
  if (error) {
    return (
      <Container maxWidth="md">
        <Typography
          variant="h5"
          align="center"
          sx={{ mt: 4, color: "error.main" }}
        >
          Произошла ошибка при загрузке объявлений.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Список объявлений
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button variant="contained" href="/form">
          Разместить объявление
        </Button>

        {/* Поиск и фильтр */}
        <Box display="flex" gap={2}>
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

      {/* Если нет результатов, показываем заглушку */}
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
