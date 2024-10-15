import React, { useState } from 'react';
import { useCourse } from '../context_api/CourseContext';
import { Grid, Box, Image, Flex, Heading, Text, Button, Spacer, useColorMode, Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import Pagination from './Pagination'; 
import CustomLoader from './CustomLoader';
import { SearchIcon } from '@chakra-ui/icons';

function CourseGrid() {
  const { course, loading } = useCourse();
  const { colorMode } = useColorMode();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <CustomLoader />
      </Box>
    );
  }

  
  const filteredCourses = course.filter((item) => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <Box p={4} m={4} >
     <InputGroup mb={4}>
        <Input
          placeholder="Search by Course..."
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
      

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
        gap={6}
        padding={4}
      >
        {currentCourses.map((item) => (
          <Box
            key={item.id}
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
              src={item.image}
              alt={item.title}
              width="100%"
              height="400px"
              objectFit="cover"
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
                  {item.title}
                </Heading>
                <Text 
                  color={colorMode === "light" ? "gray.600" : "white"} 
                  mb={1} 
                  noOfLines={1}
                >
                  {item.subtitle}
                </Text>
                <Text mb={2} noOfLines={2} height="50px" overflow="hidden">
                  {item.description && item.description.length > 200
                    ? `${item.description.substring(0, 200)}...`
                    : item.description}
                </Text>
              </Box>
              <Flex align="center" mt="auto">
                <Text fontWeight="bold" mr={2}>
                  {item.price}
                </Text>
                <Spacer />
                <Button colorScheme="pink" size="sm" as="a" href={item.url} target="_blank">
                  Learn More
                </Button>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Grid>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </Box>
  );
}

export default CourseGrid;
