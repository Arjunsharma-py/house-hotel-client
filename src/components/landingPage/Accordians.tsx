import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const contents = [
  {
    title: "What is HouseHotel and how does it work?",
    desc: "We verify personal profiles and listings to make sharing easy, enjoyable and safe for millions of Hosts and travellers worldwide. Find out more about HouseHotel.",
  },
  {
    title: "How do I use search filters?",
    desc: "It’s easy to use our search filters to only show the listings that have the accessibility features you need. Learn more about using search filters and discover more flexible ways to search.",
  },
  {
    title: "Do I need to meet my Host?",
    desc: "Options like self check-in or booking an entire home allow you to interact with your Host mainly through in-app messaging – you can message them anytime if something comes up.",
  },
  {
    title:
      "What if I need to cancel due to a problem with the listing or Host?",
    desc: "In most cases, you can resolve any issues directly by messaging your Host. If they can't help, simply contact HouseHotel within 24 hours of discovering the issue. Learn more",
  },
  {
    title: "Need more information?",
    desc: "Visit our Help Centre to get additional answers to your questions. Learn more",
  },
];

const Accordians = () => {
  return (
    <Accordion allowMultiple>
      {contents.map((content, index) => (
        <AccordionItem key={index}>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontSize={{ base: "15px", lg: "20px" }}
                    paddingY={3}
                  >
                    {content.title}
                  </Box>
                  {isExpanded ? (
                    <BiChevronUp fontSize={30} />
                  ) : (
                    <BiChevronDown fontSize={30} />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                color={useColorModeValue("gray.600", "gray.100")}
              >
                {content.desc}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Accordians;
