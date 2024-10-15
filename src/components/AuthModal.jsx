import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'https://webstore-backend-rzgw.onrender.com/auth/login' : 'https://webstore-backend-rzgw.onrender.com/auth/register';
      const payload = isLogin ? { email, password } : { username, email, password };
      const response = await axios.post(url, payload);

    
      localStorage.setItem('user', JSON.stringify(response.data));

      toast({
        title: isLogin ? 'Logged in successfully' : 'Registered successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });

    
      setEmail('');
      setPassword('');
      setUsername('');

      onClose();
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: error.response?.data?.message || 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  
  const modalBgColor = useColorModeValue('white', 'gray.800');
  const modalTextColor = useColorModeValue('black', 'white');
  const buttonColorScheme = 'blue'; 

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={modalBgColor} color={modalTextColor}>
        <ModalHeader>{isLogin ? 'Login' : 'Sign Up'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isLazy>
            <TabList>
              <Tab onClick={() => { setIsLogin(true); setUsername(''); }}>Login</Tab>
              <Tab onClick={() => { setIsLogin(false); setUsername(''); }}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={buttonColorScheme} onClick={handleSubmit}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
