import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  Divider,
} from "@chakra-ui/react";

const MainFooter = () => {
  return (
    <Box bg="gray.50" color="gray.600">
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <Text fontWeight={"bold"}>Company</Text>
            <Link href={"#"}>About Us</Link>
            <Link href={"#"}>Careers</Link>
            <Link href={"#"}>Blog</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight={"bold"}>Support</Text>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Safety Information</Link>
            <Link href={"#"}>Cancellation Options</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight={"bold"}>Community</Text>
            <Link href={"#"}>Diversity & Belonging</Link>
            <Link href={"#"}>Accessibility</Link>
            <Link href={"#"}>Invite Friends</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <Text fontWeight={"bold"}>Host</Text>
            <Link href={"#"}>Host Your Home</Link>
            <Link href={"#"}>Host an Experience</Link>
            <Link href={"#"}>Responsible Hosting</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Divider />
      {/* <Box borderTopWidth={1} borderStyle={"solid"} borderColor={"gray.200"}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2024 Airbnb, Inc.</Text>
          <Stack direction={"row"} spacing={6}>
            <Link href={"#"}>Privacy</Link>
            <Link href={"#"}>Terms</Link>
            <Link href={"#"}>Sitemap</Link>
          </Stack>
        </Container>
      </Box> */}
    </Box>
  );
};

export default MainFooter;
