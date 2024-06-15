import { useState } from "react";

export const useMultiStepForm = (steps: React.ReactElement[]) => {
  const [stepIndex, setStepIndex] = useState(0);

  function next() {
    setStepIndex((prev) => (prev >= steps.length - 1 ? prev : prev + 1));
  }
  function back() {
    setStepIndex((prev) => (prev <= 0 ? prev : prev - 1));
  }

  return {
    steps,
    stepIndex,
    next,
    back,
    step: steps[stepIndex],
    isFirstStep: stepIndex === 0,
    isLastStep: stepIndex >= steps.length - 1,
  };
};
