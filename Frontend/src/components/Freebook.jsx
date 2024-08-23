import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../components/Cards";
import axios from "axios";
import { useEffect, useState } from 'react';

function Freebook() {
  const[book,setBook]=useState([])
  useEffect(()=>{
     const getBook=async()=>{
        try{
         const res= await axios.get("http://localhost:4001/book");
         
         const data=res.data.filter((data)=>data.cateogry==="Free");
         console.log(data);
         setBook(data);
        }catch(error){
           console.log(error);
        }
     }
     getBook();
  },[]);
  //  const filterData=list.filter((data)=>data.cateogry==="Free");
   var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  return (<>
  <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 text-center'>
   <div>
   <h1 className='text-3xl text-blue-500 font-bold ;'>
      Free Offer Courses
   </h1>
   <p className='py-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis unde ipsa voluptatibus veritatis perferendis nesciunt sed repellat sunt? Similique cumque sint molestias pariatur, iusto earum ab qui cupiditate impedit tenetur?</p>
  </div>
  <div>
  <Slider {...settings}>
        {book.map((item)=>(
         <Cards item={item} key={item.id} />
        ))}
      </Slider>
  </div>
  </div>
  </>
  )
}

export default Freebook