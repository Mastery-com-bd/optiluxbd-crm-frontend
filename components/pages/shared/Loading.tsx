import Lottie from "lottie-react";
import animationData from '@/public/lottie/loading.json';

const Loading = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Lottie animationData={animationData} />
        </div>
    );
};

export default Loading;