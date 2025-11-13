'use client'
import { useParams } from "next/navigation";

const CustomerStat = () => {
    const {customerId} = useParams();
    console.log(customerId);
    return (
        <div>
            customer stat for = { }
        </div>
    );
};

export default CustomerStat;