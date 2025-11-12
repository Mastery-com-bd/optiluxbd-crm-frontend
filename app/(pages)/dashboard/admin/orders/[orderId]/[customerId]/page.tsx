'use client'
import { useParams } from "next/navigation";

const CustomerStat = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            customer stat for = { }
        </div>
    );
};

export default CustomerStat;