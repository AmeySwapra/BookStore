import React from 'react';
import { Button, ButtonGroup, Flex, useColorMode, useBreakpointValue } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const { colorMode } = useColorMode();
    const showNavigationButtons = useBreakpointValue({ base: false, md: true });

    const handlePreviousPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <Flex justify="center" mt={8} wrap="wrap">
            <ButtonGroup spacing={{ base: 2, md: 4 }} flexWrap="wrap">
               
                {showNavigationButtons && (
                    <Button 
                        onClick={handlePreviousPage} 
                        isDisabled={currentPage === 1}
                        colorScheme="pink"
                        size={{ base: 'sm', md: 'md' }}
                    >
                        Previous
                    </Button>
                )}

                {[...Array(totalPages)].map((_, index) => (
                    <Button
                        key={index + 1}
                        onClick={() => onPageChange(index + 1)}
                        variant={currentPage === index + 1 ? "solid" : "outline"}
                        colorScheme="pink"
                        size={{ base: 'sm', md: 'md' }}
                    >
                        {index + 1}
                    </Button>
                ))}

               
                {showNavigationButtons && (
                    <Button 
                        onClick={handleNextPage} 
                        isDisabled={currentPage === totalPages}
                        colorScheme="pink"
                        size={{ base: 'sm', md: 'md' }}
                    >
                        Next
                    </Button>
                )}
            </ButtonGroup>
        </Flex>
    );
};

export default Pagination;
