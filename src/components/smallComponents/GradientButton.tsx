import React from "react";
import { Button, Spinner } from "@chakra-ui/react";

interface Props {
  text: string;
  width?: string;
  paddingY?: number;
  marginY?: number;
  isLoading?: boolean;
  onClick?: () => void;
}

const GradientButton = ({
  text,
  width,
  paddingY,
  marginY,
  onClick,
  isLoading,
}: Props) => {
  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = e.target as HTMLButtonElement;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    target.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <Button
      // bgGradient="radial(circle, teal.500, blue.500)"
      variant="myVariant"
      backgroundSize="200% 200%"
      onMouseMove={handleMouseMove}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        target.style.backgroundPosition = "center";
      }}
      onClick={onClick}
      w={width}
      paddingY={paddingY}
      marginY={marginY}
      isLoading={isLoading}
      spinner={<Spinner />}
    >
      {text}
    </Button>
  );
};

export default GradientButton;
