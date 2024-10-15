import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  Stack,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import bannerImage from '../assets/homeImg.png';

const Banner = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      mx={{ base: '5px', md: '20px', lg: '85px' }} 
      p={{ base: '4', md: '6', lg: '8' }} 
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={{ base: 'column', md: 'row' }} 
      mt={1} 
      mb={8} 
    >
      <Flex flex="1" alignItems="center" mb={{ base: 6, md: 0 }}>
        <Stack spacing={4} flex="1">
          <Heading as="h1" size={{ base: 'lg', md: 'xl' }} color={useColorModeValue('black', 'white')}>
            Hello, welcome here to learn something
            <br />
            <span style={{ color: '#FF69B4', fontWeight: 'bold' }}> new everyday!!!</span>
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color={useColorModeValue('gray.600', 'gray.400')}>
            Discover a world of knowledge with our curated selection of books.
            <br />
            Whether you’re looking for the latest bestsellers or timeless classics,
            <br />
            we have something for everyone.
            <br />
            Join our community of readers and explore new horizons every day!
          </Text>
          <Flex direction={{ base: 'column', md: 'row' }} gap='10px' alignItems={{ base: 'flex-start', md: 'center' }}>
            <Input
              placeholder="Email"
              variant="filled"
              size="lg"
              mb={{ base: 2, md: 0 }} 
              borderRadius="md"
              width={{ base: '100%', md: '300px' }} 
            />
            <Button colorScheme="pink" size="lg">
              Get Started
            </Button>
          </Flex>
        </Stack>
      </Flex>
      <Flex flex="1" justifyContent="center">
        <Image
          src={bannerImage}
          alt="Banner Illustration"
          boxSize="100%"
          objectFit="cover"
          borderRadius="md"
        />
      </Flex>
    </Box>
  );
};

export default Banner;
