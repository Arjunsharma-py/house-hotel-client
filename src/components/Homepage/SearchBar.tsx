import { useCallback, useState } from "react";
import useHouseQuery from "../../store";
import { Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import debounce from "lodash.debounce";

interface Props {
  width?: string;
}

const SearchBar = ({ width }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const { setSearchText } = useHouseQuery();

  const debouncedSetSearchText = useCallback(
    debounce((value: string) => {
      setSearchText(value);
    }, 500),
    []
  );

  const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSetSearchText(value);
  };

  return (
    <InputGroup width={width}>
      <Input
        borderRadius={20}
        placeholder="Where you want to go?"
        value={inputValue}
        onChange={handleSearchText}
        paddingY={0}
        variant={"searchBar"}
      />
      <InputRightElement
        pointerEvents="none"
        children={
          <Text
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            width={"100%"}
          >
            <span>Search</span>
            <BsSearch />
          </Text>
        }
        color={"white"}
        bg={"red.400"}
        borderRightRadius={"full"}
        width={"100px"}
      />
    </InputGroup>
  );
};

export default SearchBar;
