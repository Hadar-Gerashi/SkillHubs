import * as React from 'react';
import { useDispatch } from "react-redux";

import { removeFromCart } from '../features/cartSlice.js'
import './course.css'

//קומפוננטה להצגת קורס בודד ברשימת ההזמנות
const CourseInOrder = ({ course, onDelete }) => {
    let dispatch = useDispatch()
console.log(course)
    const deleted = () => {
        dispatch(removeFromCart(course._id))
        onDelete(course._id)
    };
    return (


        <tr key={course._id}>
            <td style={{ padding: '10px', width: '50%', height: "100px" }}>
                <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                    <img src={`https://res.cloudinary.com/dc583pymo/image/upload/v1745307156/uploads/${course?.img}`} width="100px" height="100px" alt={course.name} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ marginBottom: "8px" }} >{course.name}</strong>
                        <p style={{ fontSize: "12px" }}><b> Open Date:</b> {course?.openingDate.substring(0, 10)}</p>
                        <p style={{ fontSize: "12px" }}><b> During:</b> {course?.long} meetings</p>
                        <p style={{ fontSize: "12px" }}><b> Price:</b> {course?.price}$</p>
                        <p style={{ fontSize: "12px" }}><b> Qty:</b> {course?.qty}</p>
                    </div>  </div>
                {course.description}
            </td>

           
        </tr>

    )

}
export default CourseInOrder;



