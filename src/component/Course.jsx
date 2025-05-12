import { Badge, Box, Button, Card, HStack, Image, Text } from "@chakra-ui/react"
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';


import './course.css'
import { deleteCourse } from '../api/courseService.js'
import { removeFromCart ,addToCart,isOpenDrawer} from '../features/cartSlice'
import AlertDialog from "./AlertDialog";


// קומפוננטה של קורס בודד ברשימת הקורסים
const Course = ({ course, onDelete,type ,setIsCourse}) => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let user = useSelector(state => state.users.currentUser)

    const deleted = async () => {
        try {
            await deleteCourse(course._id, user?.token)
            onDelete(course._id)
            dispatch(removeFromCart(course._id))
        }
        catch (ex) {
            if(ex.response.status === 401)
                navigate('/login')
            console.log(ex);
            alert(ex.response.data.message)
        }
    };

    return (
        <Card.Root flexDirection="row" overflow="hidden" height="246px" width="390px" border="none">

            <Image
                objectFit="cover"
                width="30%"
                height="246px"
                // src={`https://skillhub-1-a27y.onrender.com/uploads/${course?.img}`}
                // https://res.cloudinary.com/dc583pymo/image/upload/v1745307156/uploads/p1.jpg
                  src={`https://res.cloudinary.com/dc583pymo/image/upload/v1745307156/uploads/${course?.img}`}
                alt={`${course?.name} image`}
            />

            <Box>

                <Card.Body>
                    <Card.Title mb="2">{course?.name[0].toUpperCase() + course?.name.slice(1).toLowerCase()}</Card.Title>
                    <Card.Description style={{color:"black"}}>
                        {course?.motivation}
                    </Card.Description>
                    <HStack mt="4">
                        {course?.categories.map((item) => (
                            <Badge key={item}>{item[0].toUpperCase() + item.slice(1).toLowerCase()}</Badge>
                        ))}
                    </HStack>
                </Card.Body>

                <Card.Footer>
                    <HStack spacing={4}>
                     {type=='Show' &&
                    <Link to={"/details/" + course?._id} target="_blank" rel="noopener noreferrer">
                               <Button>Show Details</Button>
                    </Link>}

                    {type!='Show' &&
                        <Link to={"details/" + course?._id}>
                            <Button onClick={()=>{setIsCourse(course?.name)}}>Show Details</Button>
                        </Link>}
                        <button 
                            className="add-to-cart"
                            onClick={() => {
                                dispatch(addToCart(course))
                                dispatch(isOpenDrawer(true))
                            }}
                        >
                            <AddShoppingCartIcon sx={{ color: "black" }} />
                        </button>
                        {user?.role === "ADMIN" && <AlertDialog deleted={deleted} />}
                        {user?.role === "ADMIN" && (
                            <button
                                onClick={() => {
                                    navigate(`/edit/${course?._id}`, { state: { status: "EDIT", details: { course } } })
                                }}
                            >
                                <DriveFileRenameOutlineOutlinedIcon />
                            </button>
                        )}
                       
                    </HStack>
                </Card.Footer>

            </Box>

        </Card.Root>
    );
};

export default Course;

