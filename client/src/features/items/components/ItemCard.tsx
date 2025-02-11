import React from "react";
import { Item } from "../../../types/itemTypes";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Card
      sx={{
        maxWidth: 350, // увеличенная максимальная ширина карточки
        margin: "auto",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      {item.image ? (
        <CardMedia
          component="img"
          image={item.image}
          alt={item.name}
          sx={{
            height: 200, // увеличенная высота изображения
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            backgroundColor: "#ccc",
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
      <CardContent sx={{ textAlign: "center", p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Локация: {item.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Категория: {item.type}
        </Typography>
      </CardContent>
      <CardActions sx={{ pb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          href={`/item/${item.id}`}
          fullWidth
        >
          Открыть
        </Button>
      </CardActions>
    </Card>
  );
};
