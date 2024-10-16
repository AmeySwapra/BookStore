import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  useColorMode,
  HStack,
  Spacer,
  Collapse,
  useDisclosure,
  Stack,
  Badge,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import ProfileModal from './ProfileModal';

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
 
  const user = JSON.parse(localStorage.getItem('user'));

  const { isOpen: isProfileModalOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure(); // Manage profile modal state



  return (
    <>
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="1000"
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        boxShadow="sm"
        p={4}
      >
        <Flex align="center" justifyContent="space-between" maxW="1200px" mx="auto">
          <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color={colorMode === 'light' ? 'black' : 'white'}>
            BookStore
          </Text>
          <Spacer />
          <IconButton
            aria-label="Toggle mobile menu"
            icon={isOpen ? <FaSun /> : <FaMoon />}
            onClick={onToggle}
            variant="ghost"
            display={{ base: 'block', md: 'none' }}
            color={colorMode === 'light' ? 'black' : 'white'}
          />
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }} color={colorMode === 'light' ? 'black' : 'white'}>
            <Link to="/">Home</Link>
            <Link to="/books">Books</Link>
            <Link to="/course">Course</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <Link to="/checkout">
              <HStack>
                <IconButton
                  aria-label="Cart"
                  icon={<FaShoppingCart />}
                  variant="ghost"
                  color={colorMode === 'light' ? 'black' : 'white'}
                />
                
              </HStack>
            </Link>
            <IconButton
              aria-label="Toggle dark/light mode"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
              color={colorMode === 'light' ? 'black' : 'white'}
            />
            {user && user.username ? (
              <Button
                bg={colorMode === 'light' ? 'black' : 'white'}
                color={colorMode === 'light' ? 'white' : 'black'}
                onClick={onProfileOpen} 
              >
                Profile
              </Button>
            ) : (
              <Button
                bg={colorMode === 'light' ? 'black' : 'white'}
                color={colorMode === 'light' ? 'white' : 'black'}
                onClick={() => setAuthModalOpen(true)} 
              >
                Login
              </Button>
            )}
          </HStack>
        </Flex>
        <Collapse in={isOpen}>
          <Stack spacing={4} mt={4} color={colorMode === 'light' ? 'black' : 'white'}>
            <Link to="/">Home</Link>
            <Link to="/books">Books</Link>
            <Link to="/course">Course</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <Link to="/checkout">
              <HStack>
                <IconButton
                  aria-label="Cart"
                  icon={<FaShoppingCart />}
                  variant="ghost"
                  color={colorMode === 'light' ? 'black' : 'white'}
                />
               
              </HStack>
            </Link>
          </Stack>
        </Collapse>
      </Box>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={onProfileClose} />
    </>
  );
}

export default Navbar;
