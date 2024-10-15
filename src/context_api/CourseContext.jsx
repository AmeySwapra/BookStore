import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext();

export const useCourse = () => {
    return useContext(CourseContext);
}



export const CourseProvider = ({children}) => {
   const [course, setCourse] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const fetchCourse = async () => {
     try {
        const response = await axios.get("https://webstore-backend-rzgw.onrender.com/courses/get-courses");
        setCourse(response.data)
        console.log(response.data)
     } catch (error) {
        setError(error)
     } finally {
        setLoading(false)
     }
   }

   useEffect(() => {
       fetchCourse();
   },[])

   return(
      <CourseContext.Provider value={{course, loading, error}} >
          {children}
      </CourseContext.Provider>
   )
} 