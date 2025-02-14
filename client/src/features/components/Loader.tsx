/**
 * `Loader` — компонент для отображения индикатора загрузки.
 *
 * Используется для блокировки экрана во время выполнения асинхронных операций,
 * например, при загрузке данных или ожидании ответа от сервера.
 */

import { Backdrop, CircularProgress } from "@mui/material";

/**
 * `Loader` — индикатор загрузки с затемненным фоном.
 *
 * @returns Компонент-заглушка, блокирующий экран с анимацией загрузки.
 */
export const Loader = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff", // Цвет индикатора загрузки
        zIndex: (theme) => theme.zIndex.drawer + 1, // Поверх всех элементов
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Затемнение фона
      }}
      open={true} // Индикатор всегда активен
    >
      <CircularProgress color="inherit" /> {/* Вращающийся индикатор */}
    </Backdrop>
  );
};
