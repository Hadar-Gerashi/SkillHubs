import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HStack } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Outlet } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
import { useLocation } from 'react-router-dom';

import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRoot,
} from "../components/ui/pagination"
import { getAllCourses, getTotalPages } from '../api/courseService.js'
import Course from '../component/Course.jsx';
import './courseList.css'
import DrawerCart from '../component/DrawerCart.jsx';
import Loading from '../component/Loading';
import './courseList.css'
import Footer from '../component/Footer';




const CoursesList = ({ type }) => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState("init")
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [isCourse, setIsCourse] = useState("")
    let drawerIsOpen = useSelector(state => state.cart.drawerIsOpen)
    let dispatch = useDispatch()



    const onDelete = (id) => {
        let copy = courses.filter(item => item._id !== id)
        setCourses(copy)
    }

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setIsCourse(""); // מאפס את isCourse רק אם הניווט הוא לעמוד הקורסים
        }
    }, [location.pathname]);



    useEffect(() => {
        setLoading("pending")
        getAllCourses(currentPage).then(res => {
            if (type == 'Show') {
                if (courses.length === 0) {
                    setCourses(res.data);
                } else {
                    setCourses(prevCourses => [...prevCourses, ...res.data]);
                }
            }

            else
                setCourses(res.data)
        }).catch(err => {
            console.log(err)
            alert("שגיאה בקבלת קורסים")
        }).finally(() => {
            setLoading("finish")
        })

    }, [currentPage])

    useEffect(() => {
        getTotalPages().then(res => {
            console.log(res.data.pages)
            console.log(res.data.limit)
            setTotalPages(res.data.pages)
        }).catch(err => {
            console.log(err)
            alert("שגיאה בקבלת קורסים")
        }).finally(() => {

        })

    }, [])


    return (<>



        {loading == "pending" ?



            (type == 'Show' ?
                <Stack sx={{ color: 'white' }} spacing={2} direction="row" marginLeft="48%">

                    <CircularProgress color="inherit" />
                </Stack>
                :

                <div style={{ marginTop: "60px" }}> {/* דוחף את התוכן למטה */}
                    <Loading />
                </div>) :
            <>


                {type !== 'Show' && (
                    <div className="breadcrumb-container">
                        <a href="/home" className="breadcrumb-link">Home</a>
                        <span className="breadcrumb-arrow">&gt; </span>
                        <a href="/" className="breadcrumb-link">Courses</a>
                        <span className="breadcrumb-arrow">&gt; </span>
                        {isCourse !== "" && <span className="breadcrumb-link">{isCourse}</span>}
                    </div>
                )}


                <ul style={{
                    marginTop: "105px",
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)', // 3 עמודות בשורה
                    gap: '40px', // רווחים שווים בין הפריטים
                    justifyContent: 'center', // ממרכז את התוכן
                    padding: '0 15%', // שוליים משני הצדדים
                    marginBottom: '40px', // רווח מתחת לרשימה
                    maxWidth: '1000px', // מגביל את הרוחב למניעת פריסה רחבה מדי
                    marginLeft: 'auto',
                    marginRight: 'auto' // ממרכז את הרשימה בעמוד
                }}>

                    {courses.map(item => (
                        <li key={item._id} style={{ listStyleType: 'none', marginTop: "50px" }} >
                            <Course course={item} onDelete={onDelete} type={type} setIsCourse={setIsCourse} />
                        </li>
                    ))}
                </ul>

            </>}

        {type != 'Show' && <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative', // יישאר כחלק מהדף ולא תקוע
                marginTop: '40px', // רווח מתחת לתוכן
                padding: '10px 0', // ריווח פנימי
            }}>



                <PaginationRoot style={{marginBottom:"60px"}} count={totalPages} pageSize={1} defaultPage={currentPage} onPageChange={(e) => setCurrentPage(e.page)}>
                    <HStack>
                        <PaginationPrevTrigger className="pagination-arrows" />
                        <PaginationItems className="pagination-numbers" />
                        <PaginationNextTrigger className="pagination-arrows" />
                    </HStack>

                </PaginationRoot>


            </div>
         

            <Outlet /></>}

        {type == 'Show' &&
            currentPage != totalPages &&
            <>
                <Button onClick={() => setCurrentPage(currentPage => currentPage + 1)} style={{ backgroundColor: "white", color: "black", marginBottom: "15px" }}>show more</Button>

            </>}
        {type == 'Show' && <Footer />}


        {drawerIsOpen && <DrawerCart />}





    </>);
}

export default CoursesList;