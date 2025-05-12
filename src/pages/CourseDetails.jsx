import * as React from 'react';
import Slide from '@mui/material/Slide';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useDispatch, useSelector } from 'react-redux';
import PlaceIcon from '@mui/icons-material/Place';

import './courseDetails.css'
import { addToCart } from '../features/cartSlice.js'
import { isOpenDrawer } from '../features/cartSlice.js'
import { useNavigate, useParams } from 'react-router-dom';
import { getCourse } from '../api/courseService'
import CoursesList from './CoursesList';
import { useLocation } from "react-router-dom";





const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CourseDetails = () => {

  let dispatch = useDispatch()


  let id = useParams().id
  const [course, setCourse] = React.useState();

  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  React.useEffect(() => {
    getCourse(id).then(res => {
      console.log(res.data);
      setCourse(res.data)
    }).catch(err => {
      console.log(err);
      alert("Error in getting the courses");
      alert(err)
    })
  }, []);



  const items = [
    { value: "a", title: <p ><AccessTimeFilledIcon /><b><u> Open Date:</u></b></p>, text: <p> {course?.openingDate.substring(0, 10)}</p> },
    { value: "b", title: <p><ChairAltIcon /><b> <u>During:</u></b></p>, text: <p> {course?.long} meetings</p> },
    { value: "c", title: <p><LocalOfferIcon /><b><u> Price:</u></b></p>, text: <p> ${course?.price.toLocaleString()}</p> },
    { value: "d", title: <p>  <PlaceIcon /> <b><u> locations:</u></b></p>, text: <p> {course?.locations.map((location, index) => (<span key={index}>{` ${location} , `}</span>))}</p> }
  ]

  return (
    <>



      <div className="course-container">

        <img className="image-show"  src={`https://res.cloudinary.com/dc583pymo/image/upload/v1745307156/uploads/${course?.img}`} alt={course?.name} />

        {/* טקסט בצד ימין */}
        <div className="course-content">
          <h2 style={{ color: 'rgb(181, 154, 154)', fontSize: "2rem" }}>- {course?.name} -</h2>
          <br />
          <p ><b>Open Date:</b> {course?.openingDate.substring(0, 10)}</p>
          <p><b>During:</b> {course?.long} meetings</p>
          <p><b>Locations: </b> {course?.locations.map((location, index) => (
            <span key={index}>{`${location} ,`}</span>
          ))}</p>
          <p><b>Category:</b> {course?.categories.map((category, index) => (
            <span key={index}>{`${category.toLowerCase()} , `}</span>
          ))}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ textDecoration: 'line-through', color: 'gray' }}>${(course?.price + 1000).toLocaleString()}</span>
            <span style={{ fontSize: '1.5em', fontWeight: 'bold', marginLeft: '10px', color: "white" }}>${course?.price.toLocaleString()}</span>
          </div>
          <p className='other-color' style={{ color: " rgb(181, 154, 154)" }}>
            {course?.describe}
          </p>


          {/* כפתור הוספה לעגלה */}
          <button className="add-cart"
            onClick={() => {
              dispatch(addToCart(course))
              dispatch(isOpenDrawer(true))

            }

            }>
            add to cart
          </button>





        </div>  </div>
      <div className='courses-list-container'>
        <h1 style={{ color: "white", fontSize: "1.5rem", marginBottom: "-100px" }}>- SHOW MORE -</h1>
        <CoursesList type="Show" /></div>



    </>
  );
}


export default CourseDetails;





