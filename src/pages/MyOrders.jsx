import { useSelector } from "react-redux";
import { useState ,useEffect} from "react";

import Order from "../component/Order";
import { getOrderById, getOrders } from '../api/ordersService'


const MyOrders = ({ status }) => {
    let user = useSelector(state => state.users.currentUser)
    const [orders, setOrders] = useState([])

    useEffect(() => {

        console.log(user._id)
        if (status == "One") {

            getOrderById(user._id).then(res => {
                setOrders(res.data)
                console.log(res.data)
            }).catch(err => {
                console.log(err)

            })
        }

        else if (status == "All") {

            getOrders().then(res => {
                setOrders(res.data)
                console.log(res.data)
            }).catch(err => {
                console.log(err)

            })
        }

    }, [])



    return (<>

        <ul style={{ marginTop: "5%" }}>
            <h1 style={{ color: "white", textAlign: "left", marginLeft: "11%", fontSize: "2rem" }}>
                {status === "One" ? <span>- My</span> : <span>- All</span>} orders -
            </h1>
            {orders.map(item => (
                <li key={item._id} >
                    <Order order={item} />
                </li>
            ))}
        </ul>

    </>)
}

export default MyOrders;