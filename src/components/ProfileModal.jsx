import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const ProfileModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserDetails(storedUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://webstore-backend-rzgw.onrender.com/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); 
        toast({
          title: 'Logged out successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        });
        onClose(); 
      }
    } catch (error) {
      toast({
        title: 'Logout failed.',
        description: error.response?.data?.message || 'An error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {userDetails ? (
            <>
              <Text><strong>Name:</strong> {userDetails.username}</Text>
              <Text><strong>Email:</strong> {userDetails.email}</Text>
            </>
          ) : (
            <Text>No user details available.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
