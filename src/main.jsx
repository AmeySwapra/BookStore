import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { BooksProvider } from "./context_api/BookContext.jsx";
import { CourseProvider } from "./context_api/CourseContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <BooksProvider>
          <CourseProvider>
            <App />
          </CourseProvider>
        </BooksProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
