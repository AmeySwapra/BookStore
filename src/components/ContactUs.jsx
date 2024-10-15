import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
  useToast,
  Flex,
  Image,
} from '@chakra-ui/react';
import contactImg from '../assets/contactImg.png'

const ContactUs = () => {
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

   
    console.log(data);

   
    toast({
      title: "Message sent.",
      description: "We will get back to you soon!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: 'top-right'
    });

   
    event.target.reset();
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} align="center"  mx="auto" p={6}>
      <Box flex="1" pr={{ base: 0, md: 6 }}>
        <Image 
          src={contactImg}
          alt="Contact Us Image"
          borderRadius="md"
          maxW="100%"
        />
      </Box>
      <Box flex="1" p={6} >
        <Heading as="h2" size="lg" mb={6} textAlign="center">Contact Us</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" placeholder="Your Name" />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" placeholder="Your Email" />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Subject</FormLabel>
            <Input type="text" name="subject" placeholder="Subject" />
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea name="message" placeholder="Your Message" rows={6} />
          </FormControl>
          <Button colorScheme="pink" type="submit" width="full">
            Send Message
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ContactUs;
