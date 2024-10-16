import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Stack,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const { colorMode } = useColorMode();
  const [cartItems, setCartItems] = useState([]);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("userCart")) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + (item.price.value || item.price) * (item.quantity || 1),
      0
    );
  };

  const updateQuantity = (index, delta) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const currentItem = updatedItems[index];
      const newQuantity = (currentItem.quantity || 1) + delta;

      if (newQuantity > 0) {
        updatedItems[index] = { ...currentItem, quantity: newQuantity };
      }

      localStorage.setItem("userCart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeItem = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);

      if (updatedItems.length === 0) {
        localStorage.removeItem("userCart");
      } else {
        localStorage.setItem("userCart", JSON.stringify(updatedItems));
      }

      return updatedItems;
    });
  };
 

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert(
        "Failed to load Razorpay SDK. Please check your internet connection."
      );
      return;
    }
   

    const options = {
      key: "rzp_test_zrT1Hy0dNJFJNq", 
      amount: calculateTotal() * 100,
      currency: "INR",
      name: "Books Checkout",
      description: "Test transaction for purchasing books",
      handler: function (response) {
        setIsPaymentSuccessful(true);
        console.log("Payment successful:", response);
        localStorage.removeItem("userCart");
        setCartItems([]);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response) {
      setIsPaymentSuccessful(false);
      console.log("Payment failed:", response.error);
    });
  };

  const textColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Box p={6} maxWidth="900px" mx="auto">
      <Center mb={6}>
        <Heading size="lg">Checkout</Heading>
      </Center>

      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
        <GridItem>
          <Heading size="md" mb={4}>
            Your Cart
          </Heading>
          {cartItems.length === 0 ? (
            <Text>No books in your bucket.</Text>
          ) : (
            <List spacing={4}>
              {cartItems.map((item, index) => (
                <ListItem
                  key={index}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  bg={colorMode === "light" ? "white" : "gray.700"}
                  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
                  p={4}
                  display="flex"
                  alignItems="center"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width="100px"
                    objectFit="cover"
                    mr={4}
                  />
                  <Box flex="1">
                    <Text fontSize="lg" fontWeight="bold">
                      {item.title}
                    </Text>
                    <Text color={textColor}>
                      Price: ₹{item.price.value || item.price}
                    </Text>
                    <Text color={textColor}>
                      Quantity: {item.quantity || 1}
                    </Text>
                    <Stack direction="row" spacing={4} mt={2}>
                      <Button
                        size="sm"
                        onClick={() => updateQuantity(index, 1)}
                        color="white"
                        background="pink.500"
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateQuantity(index, -1)}
                        isDisabled={(item.quantity || 1) <= 1}
                        color="white"
                        background="pink.500"
                      >
                        -
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => removeItem(index)}
                        color="white"
                        background="red.500"
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </GridItem>

        <GridItem>
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={6}
            bg={colorMode === "light" ? "white" : "gray.700"}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.5)"
          >
            <Heading size="md" mb={4}>
              Order Summary
            </Heading>
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg">Items: {cartItems.length}</Text>
              <Text fontSize="lg">Subtotal: ₹{calculateTotal()}</Text>
              <Text fontSize="lg" fontWeight="bold">
                Total: ₹{calculateTotal()}
              </Text>
              <Button colorScheme="pink" onClick={handlePayment} w="full">
                Pay Now
              </Button>
            </VStack>

            {isPaymentSuccessful === true && (
              <Alert status="success" mt={4}>
                <AlertIcon />
                Payment was successful! Thank you for your purchase.
              </Alert>
            )}
            {isPaymentSuccessful === false && (
              <Alert status="error" mt={4}>
                <AlertIcon />
                Payment failed. Please try again.
              </Alert>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Checkout;
