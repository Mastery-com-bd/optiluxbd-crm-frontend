import { getOnBoardingStatus } from "@/service/onBoarding";

const OnBoardingPage = async () => {
  const result = await getOnBoardingStatus();

  return <div>this is result</div>;
};

export default OnBoardingPage;
