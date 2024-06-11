import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
interface FormButtonProps {
  buttonLabel: string;
  isPending: boolean;
}

const FormButton = ({ buttonLabel, isPending }: FormButtonProps) => {
  return (
    <Button type="submit" className="w-full" disabled={isPending} >
      {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : buttonLabel}
    </Button>
  );
};

export default FormButton;
