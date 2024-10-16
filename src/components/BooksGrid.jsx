import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Button,
  Heading,
  Flex,
  Spacer,
  useColorMode,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"; 
import { useBooks } from "../context_api/BookContext"; 
import CustomLoader from "./CustomLoader";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const BooksGrid = () => {
  const { books, loading } = useBooks(); 
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const booksPerPage = 6;
  const { colorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem("userCart")) || [];
    setCart(storedCart);
  }, []);

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem("userCart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (book) => {
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    toast({
      title: 'Book added to cart!',
      description: `You've added "${book.title}" to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const totalPages = Math.ceil(books.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <Box p={4} m={4}>
      <InputGroup mb={4}>
        <Input
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            aria-label="Search books"
            icon={<SearchIcon />}
            variant="link"
          />
        </InputRightElement>
      </InputGroup>

      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} mx="auto">
            {currentBooks.map((book) => (
              <Link to={`/single-book/${book.id}`} key={book.id}>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={4}
                  bg={colorMode === "light" ? "white" : "gray.700"}
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
                  <Flex
                    direction="column"
                    justify="space-between"
                    flexGrow={1}
                    mt={2}
                  >
                    <Box>
                      <Heading size="md" fontWeight="bold" noOfLines={1}>
                        {book.title}
                      </Heading>
                      <Text color="gray.600" mb={1} noOfLines={1}>
                        {book.author}
                      </Text>
                      <Text mb={2} noOfLines={2} height="50px" overflow="hidden">
                        {book.summary.length > 200
                          ? `${book.summary.substring(0, 200)}...`
                          : book.summary}
                      </Text>
                    </Box>
                    <Flex align="center" mt="auto">
                      <Text fontWeight="bold" mr={2}>
                        {book.price.displayValue} {book.price.currency}
                      </Text>
                      <Spacer />
                      <Button colorScheme="pink" size="sm" onClick={() => handleAddToCart(book)}>
                        Buy
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </Link>
            ))}
          </SimpleGrid>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Box>
  );
};

export default BooksGrid;
