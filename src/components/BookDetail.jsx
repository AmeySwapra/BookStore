import React from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../context_api/BookContext";
import {
  Text,
  Box,
  Image,
  VStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomLoader from "./CustomLoader";

function BookDetail() {
  const { id } = useParams();
  const { books, loading } = useBooks();

  const filteredData = books.filter((item) => item.id === id);

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <CustomLoader />
      </Box>
    );
  }

  return (
    <>
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <Box
            key={item.id}
            bg={bg}
            color={textColor}
            maxW="800px"
            mx="auto"
            p={6}
            my={8}
          >
            <Flex direction={{ base: "column", md: "row" }} align="center">
              <Image
                src={item.image}
                alt={item.title}
                objectFit="cover"
                width={{ base: "100%", md: "50%" }}
                maxHeight="500px"
                borderRadius="md"
                mb={{ base: 6, md: 0 }}
                mr={{ md: 6 }}
              />

              <VStack align="start" spacing={4} width="100%">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={4}
                  textAlign={{ base: "center", md: "left" }}
                >
                  {item.title}
                </Text>

                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Summary:
                  </Text>
                  <Text>{item.summary}</Text>
                </Box>

                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Author:
                  </Text>
                  <Text>{item.author}</Text>
                </Box>

                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    ISBN:
                  </Text>
                  <Text>{item.ISBN}</Text>
                </Box>

                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Price:
                  </Text>
                  <Text>
                    {item.price.displayValue ||
                      `${item.price.currency} ${item.price.value}`}
                  </Text>
                </Box>
              </VStack>
            </Flex>
          </Box>
        ))
      ) : (
        <Text textAlign="center" fontSize="xl">
          No data available
        </Text>
      )}
    </>
  );
}

export default BookDetail;
