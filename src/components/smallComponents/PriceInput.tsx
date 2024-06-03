import {
  NumberInput as ChakraNumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  // NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  id: string;
  name: string;
}

const PriceInput = ({ control, id, name }: Props) => {
  const format = (val: string) => `₹` + val;
  const parse = (val: string) => val.replace(/^\$/, "");

  const [value, setValue] = useState("500");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ChakraNumberInput
          {...field}
          onChange={(valueString) => setValue(parse(valueString))}
          value={format(value)}
          min={100}
          step={500}
          precision={2}
          focusBorderColor="black"
          id={id}
          allowMouseWheel
        >
          <NumberInputField padding={7} fontWeight={600} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </ChakraNumberInput>
      )}
    />
  );
};

export default PriceInput;
