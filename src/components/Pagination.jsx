import React from 'react';
import { Button, ButtonGroup, Flex, useColorMode } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const { colorMode } = useColorMode(); 

    const handlePreviousPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <Flex justify="center" mt={8}>
            <ButtonGroup spacing={4}>
                <Button 
                    onClick={handlePreviousPage} 
                    isDisabled={currentPage === 1}
                    colorScheme={colorMode === 'dark' ? 'pink' : 'pink'} 
                >
                    Previous
                </Button>

                
                {[...Array(totalPages)].map((_, index) => (
                    <Button
                        key={index + 1}
                        onClick={() => onPageChange(index + 1)}
                        variant={currentPage === index + 1 ? "solid" : "outline"}
                        colorScheme={colorMode === 'dark' ? 'pink' : 'pink'} 
                    >
                        {index + 1}
                    </Button>
                ))}

                <Button 
                    onClick={handleNextPage} 
                    isDisabled={currentPage === totalPages}
                    colorScheme={colorMode === 'dark' ? 'pink' : 'pink'} 
                >
                    Next
                </Button>
            </ButtonGroup>
        </Flex>
    );
};

export default Pagination;
