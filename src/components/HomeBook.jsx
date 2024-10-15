import React from 'react';
import { Box, SimpleGrid, Image, Text, Heading, Button, Flex, useColorMode, Spacer } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'; 
import { useBooks } from '../context_api/BookContext'; 
import { useNavigate } from 'react-router-dom'; 
import CustomLoader from './CustomLoader';

const HomeBook = () => {
    const { books, loading } = useBooks(); 
    const { colorMode } = useColorMode();
    const nav = useNavigate();

    if (loading) {
        return <div><CustomLoader/></div>; 
    }

    return (
        <Box p={4}>
            <Heading as="h2" size="xl" mb={4} textAlign="center">
                Welcome to Our Book Store
            </Heading>
            <SimpleGrid 
                columns={{ base: 1, sm: 2, md: 3 }} 
                spacing={6}
                mx="auto"
            >
                {books.slice(0, 3).map((book) => (
                    <Box
                        key={book.id}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p={4}
                        bg={colorMode === 'light' ? 'white' : 'gray.700'}
                        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        height="100%"
                    >
                        <Image 
                            src={book.image} 
                            alt={book.title} 
                            width="100%" 
                            height="100%" 
                            maxHeight="250px" 
                            borderRadius="md"
                        />
                        <Flex direction="column" justify="space-between" flexGrow={1} mt={2}>
                            <Box>
                                <Heading size="md" fontWeight="bold" noOfLines={1}>{book.title}</Heading>
                                <Text color="gray.600" mb={1} noOfLines={1}>{book.author}</Text>
                                <Text mb={2} noOfLines={2} height="50px" overflow="hidden"> 
                                    {book.summary.length > 200 ? `${book.summary.substring(0, 200)}...` : book.summary}
                                </Text>
                            </Box>
                            <Flex align="center" mt="auto">
                    <Text fontWeight="bold" mr={2}>
                      {book.price.displayValue} {book.price.currency}
                    </Text>
                    <Spacer />
                    <Button colorScheme="pink" size="sm">
                      Buy
                    </Button>
                  </Flex>
                        </Flex>
                    </Box>
                ))}
            </SimpleGrid>
            <Flex justify="center" mt={4}>
                <Button 
                    rightIcon={<ArrowForwardIcon />} 
                    colorScheme="pink" 
                    onClick={() => nav('/books')}
                >
                    Explore Books
                </Button>
            </Flex>
        </Box>
    );
};

export default HomeBook;
