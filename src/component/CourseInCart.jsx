import { useDispatch } from "react-redux";
import * as React from 'react';

import { removeFromCart } from '../features/cartSlice.js'
import AlertDialog from "./AlertDialog.jsx";
import StepperInput from "./StepperInput.jsx";
import IsChecked from "./IsChecked.jsx";
import './course.css'


//קומפוננטה להצגת קורס בודד בעגלת הקניות
const CourseInCart = ({ course, onDelete }) => {
    let dispatch = useDispatch()

    const deleted = () => {
        dispatch(removeFromCart(course._id))
        onDelete(course._id)
    };
    return (

        <tr key={course._id} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px', width: '50%', height: "100px" }}>
                <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                    <IsChecked course={course} checked={course.checked} dis={false} />
                    <img  src={`https://res.cloudinary.com/dc583pymo/image/upload/v1745307156/uploads/${course?.img}`} width="100px" height="100px" alt={course.name} />
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: "14px" }}>
                        <strong style={{ marginBottom: "14px" }} >{course.name}</strong>
                        <p style={{ fontSize: "12px" }}><b> Open Date:</b> {course?.openingDate.substring(0, 10)}</p>
                        <p style={{ fontSize: "12px" }}><b> During:</b> {course?.long} meetings</p>
                    </div>  </div>
                {course.description}
            </td>
            <td style={{ padding: '15px' }}>${course.price}</td>
            <td style={{ padding: '15px', width: "50px" }}>
                <StepperInput course={course} />
            </td>
            <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                <AlertDialog deleted={deleted} />
            </td>
        </tr>

    )

}
export default CourseInCart;



