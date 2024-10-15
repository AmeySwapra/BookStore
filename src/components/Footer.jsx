import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  Icon,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.800', 'gray.900')}
      color={useColorModeValue('white', 'gray.200')}
      py={8}
      mt={10} 
    >
      <Flex
        direction={{ base: 'column', md: 'row' }} 
        justifyContent="space-between"
        alignItems="center"
        maxW="1200px"
        mx="auto"
        px={4} 
      >
        
        <Text fontSize="2xl" fontWeight="bold">
          BookStore
        </Text>

       
        <HStack spacing={6} mt={{ base: 4, md: 0 }}> 
          <Link href="/about">About Us</Link>
          <Link href="/course">Courses</Link>
          <Link href="/books">Books</Link>
          <Link href="/contact">Contact Us</Link>
        </HStack>

        
        <HStack spacing={4} mt={{ base: 4, md: 0 }}> 
          <Link href="https://www.facebook.com" isExternal>
            <Icon as={FaFacebook} boxSize={6} />
          </Link>
          <Link href="https://www.instagram.com" isExternal>
            <Icon as={FaInstagram} boxSize={6} />
          </Link>
          <Link href="https://www.twitter.com" isExternal>
            <Icon as={FaTwitter} boxSize={6} />
          </Link>
          <Link href="https://www.youtube.com" isExternal>
            <Icon as={FaYoutube} boxSize={6} />
          </Link>
        </HStack>
      </Flex>

      
      <Text textAlign="center" mt={4}>
        &copy; {new Date().getFullYear()} BookStore. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
