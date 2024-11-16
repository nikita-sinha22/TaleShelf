import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import {Link} from "react-router-dom"
import axios from "axios"

function Course() {
   const[book,setBook]=useState([])
   useEffect(()=>{
      const getBook=async()=>{
         try{
          const res= await axios.get("https://taleshelf-backend.onrender.com/book");
          console.log(res.data);
          setBook(res.data);
         }catch(error){
            console.log(error)
         }
      }
      getBook();
   },[]);
   return (
      <>
         <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col'>
            <div className='mt-28 items-center justify-center text-center'>
               <h1 className='text-2xl font-semibold md:text-4xl'>
                  We're delighted to have you <span className='text-pink-500' >Here! :)</span>
                  </h1>
                  <p className='mt-12'>
                     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur odit ut quaerat reiciendis nam dicta facilis? Non dicta odit praesentium! Facilis nostrum unde provident sit sequi totam maiores earum molestiae!
                  </p>
                  <Link to="/">
                  <button className='bg-pink-500 text-white px-4 py-2 rounded-md mt-6 hover:bg-pink-700 duration-300'>
                     Back
                  </button>
                  </Link>
            </div>
            <div className='mt=12 grid grid-cols-1 md:grid-cols-4'>
               {book.map((item)=> (
                  <Cards key={item.id} item={item}/>
               ))
               }
            </div>
            
         </div>
      </>
   )
}

export default Course
