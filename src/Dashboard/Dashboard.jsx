import { useQuery } from "@tanstack/react-query";
import useAdmin from "../hooks/useAdmin";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {

    const [isAdmin] = useAdmin()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: allUsers } = useQuery({
        queryKey: ['all-users-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/stat-allusers')
            return res.data
        }
    })
    const { data: totalOrders } = useQuery({
        queryKey: ['total-orders-money'],
        queryFn: async () => {
            const res = await axiosSecure.get('/totalMoney')
            return res.data
        }
    })
    //admin totals
    const totals = totalOrders?.reduce((total, prev) => total + parseInt(prev.totalPrices), 0)

    const { data: myOrders } = useQuery({
        queryKey: ['my-Orders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-stats/${user.email}`)
            return res.data
        }
    })

    //users totals order payments
    const userTotals = myOrders?.reduce((total, prev) => total + parseInt(prev.totalPrices), 0)



    return (
        <div className="mt-8 ">
            <h4 className="text-2xl ml-2">Dashboard</h4>
            <div className="divider"></div>
            {isAdmin ? <div className="stats shadow flex flex-col md:flex-row lg:flex-row gap-2 ">
                <div className="stat shadow-lg">
                    <div className="stat-figure text-primary">
                        <TfiShoppingCartFull className="text-4xl" />
                    </div>
                    <div className="stat-title">Confirm Orders</div>
                    <div className="stat-value text-primary">{totalOrders?.length}</div>

                </div>

                <div className="stat shadow-lg">
                    <div className="stat-figure text-secondary">
                        <RiMoneyDollarCircleLine className="text-4xl" />
                    </div>
                    <div className="stat-title">Total Money</div>
                    <div className="stat-value text-secondary">${totals}</div>

                </div>

                <div className="stat shadow-lg">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-4xl" />
                    </div>
                    <div className="stat-title">All Users</div>
                    <div className="stat-value">{allUsers?.length}</div>

                </div>
            </div> :

                //user stats
                <div className="stats shadow flex flex-col md:flex-row lg:flex-row gap-2">
                    <div className="stat shadow-lg">
                        <div className="stat-figure text-primary">
                            <TfiShoppingCartFull className="text-4xl" />
                        </div>
                        <div className="stat-title">Total Orders</div>
                        <div className="stat-value text-primary">{myOrders?.length}</div>

                    </div>

                    <div className="stat shadow-lg">
                        <div className="stat-figure text-secondary">
                            <RiMoneyDollarCircleLine className="text-4xl" />
                        </div>
                        <div className="stat-title">Total Payments</div>
                        <div className="stat-value text-secondary">${userTotals}</div>

                    </div>


                </div>
            }

        </div>
    );
};

export default Dashboard;