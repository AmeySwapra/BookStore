import React from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import about1 from "../assets/about-1.png";
import about2 from "../assets/about-2.png";

const AboutUs = () => {
  const { colorMode } = useColorMode();

  return (
    <Box padding={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
      
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        marginBottom={12}
        wrap="wrap"
      >
        <Box flex="1" marginRight={{ base: 0, md: 6 }} marginBottom={{ base: 4, md: 0 }}>
          <Image
            src={about1}
            alt="About Us Image 1"
            borderRadius="md"
            width="100%"
            height="auto"
            objectFit="cover"
          />
        </Box>
        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Heading size="lg" marginBottom={4}>
            About Our Bookstore
          </Heading>
          <Text
            color={colorMode === "light" ? "gray.800" : "white"}
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="1.8"
          >
            At our Bookstore, we believe in the power of stories to transform
            lives and ignite imaginations. Our collection spans genres and ages,
            catering to every reader's desire. With carefully curated
            selections, we strive to create an inviting atmosphere where readers
            can explore, discover, and connect with the written word. Whether
            you're a lifelong book lover or just beginning your reading journey,
            our friendly staff is here to guide you.
          </Text>
        </Box>
      </Flex>

   
      <Flex
        direction={{ base: "column", md: "row-reverse" }}
        align="center"
        wrap="wrap"
      >
        <Box flex="1" marginLeft={{ base: 0, md: 6 }} marginBottom={{ base: 4, md: 0 }}>
          <Image
            src={about2}
            alt="About Us Image 2"
            borderRadius="md"
            width="100%"
            height="auto"
            objectFit="cover"
          />
        </Box>
        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Heading size="lg" marginBottom={4}>
            Our Mission
          </Heading>
          <Text
            color={colorMode === "light" ? "gray.800" : "white"}
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="1.8"
          >
            Our mission is to promote literacy and foster a love for reading in
            our community. We are dedicated to providing a diverse range of
            books and resources, while also hosting events that bring readers
            together. We believe that books can change lives, and we are
            committed to ensuring that everyone has access to the stories that
            matter. Join us in celebrating the magic of literature.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutUs;
