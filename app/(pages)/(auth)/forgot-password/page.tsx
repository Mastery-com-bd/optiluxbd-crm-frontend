import ForgetPasswordComponent from "@/components/auth/forgetPassword/ForgetPasswordComponent";
import LoginText from "@/components/auth/login/LoginText";

const ForgetPassowrd = () => {
  return (
    <section className="h-screen px-4 lg:px-44 flex flex-col lg:flex-row items-center lg:justify-between ">
      <LoginText />
      <ForgetPasswordComponent />
    </section>
  );
};

export default ForgetPassowrd;
