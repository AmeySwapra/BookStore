
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BooksContext = createContext();

export const useBooks = () => {
    return useContext(BooksContext);
};

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://webstore-backend-rzgw.onrender.com/books/get-book');
                setBooks(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <BooksContext.Provider value={{ books, loading, error }}>
            {children}
        </BooksContext.Provider>
    );
};
