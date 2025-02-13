import React from "react";
import { Button, Box, Stack } from "@mui/material";

interface StepNavigationProps {
  activeStep: number;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleSubmit: () => void;
}

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
