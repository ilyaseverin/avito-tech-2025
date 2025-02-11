import React from "react";
import { Button } from "@mui/material";

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
  <div style={{ marginTop: 16 }}>
    {activeStep === 0 ? (
      <Button variant="contained" onClick={handleNextStep}>
        Далее
      </Button>
    ) : (
      <>
        <Button
          variant="outlined"
          onClick={handlePrevStep}
          style={{ marginRight: 8 }}
        >
          Назад
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Сохранить
        </Button>
      </>
    )}
  </div>
);
