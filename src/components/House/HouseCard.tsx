import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image } from "@chakra-ui/react";
import House from "../../interfaces/House";
import { Link } from "react-router-dom";

interface Props {
  house: House;
}

const HouseCard = ({ house }: Props) => {
  const property = {
    id: house._id,
    imageUrl: house?.images[0].src,
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: house.details.name,
    address: house.address.full,
    formattedPrice: `₹${house.price.original_price}`,
    reviewCount: 34,
    rating: house.rating,
  };
  return (
    <>
      <Link to={`/place/${property.id}`}>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          cursor={"pointer"}
        >
          <Image src={property.imageUrl} alt={property.imageAlt} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {property.beds} beds &bull; {property.baths} baths
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {property.title}
            </Box>
            <Box
              mt="1"
              as="h5"
              lineHeight="tight"
              noOfLines={1}
              fontSize={"sm"}
            >
              {property.address}
            </Box>

            <Box fontWeight="semibold">
              {property.formattedPrice}
              <Box
                as="span"
                color="gray.600"
                fontSize="sm"
                fontWeight="semibold"
              >
                / wk
              </Box>
            </Box>

            <Box display="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < property.rating ? "black" : "gray.300"}
                  />
                ))}
              <Box
                as="span"
                ml="2"
                color={property.rating ? "gray.800" : "gray.600"}
                fontSize="sm"
              >
                {property.reviewCount} reviews
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
    </>
  );
};

export default HouseCard;
