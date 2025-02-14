/**
 * `StepNavigation` — компонент навигации по шагам формы.
 * Используется в многошаговой форме создания объявления.
 */

import React from "react";
import { Button, Box, Stack } from "@mui/material";

/**
 * Интерфейс пропсов для `StepNavigation`.
 */
interface StepNavigationProps {
  /**
   * Текущий активный шаг формы.
   */
  activeStep: number;

  /**
   * Обработчик перехода к следующему шагу.
   */
  handleNextStep: () => void;

  /**
   * Обработчик возврата к предыдущему шагу.
   */
  handlePrevStep: () => void;

  /**
   * Обработчик отправки формы.
   */
  handleSubmit: () => void;
}

/**
 * `StepNavigation` — компонент управления шагами формы.
 * В зависимости от текущего шага отображает кнопки "Далее", "Назад" и "Сохранить".
 *
 * @param activeStep Текущий шаг
 * @param handleNextStep Функция перехода к следующему шагу
 * @param handlePrevStep Функция возврата к предыдущему шагу
 * @param handleSubmit Функция отправки формы
 * @returns JSX-элементы кнопок управления
 */
export const StepNavigation: React.FC<StepNavigationProps> = ({
  activeStep,
  handleNextStep,
  handlePrevStep,
  handleSubmit,
}) => (
  <Box sx={{ mt: 3, display: "flex", justifyContent: "center", width: "100%" }}>
    <Stack
      direction="row"
      spacing={2}
      sx={{
        width: "100%",
        maxWidth: 400,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {activeStep === 0 ? (
        <Button variant="contained" fullWidth onClick={handleNextStep}>
          Далее
        </Button>
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={handlePrevStep}
            sx={{ flex: 1, minWidth: 100 }}
          >
            Назад
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ flex: 1, minWidth: 100 }}
          >
            Сохранить
          </Button>
        </>
      )}
    </Stack>
  </Box>
);
