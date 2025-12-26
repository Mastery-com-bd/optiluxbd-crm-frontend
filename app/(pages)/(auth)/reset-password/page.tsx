import LoginText from "@/components/auth/login/LoginText";
import ResetPasswordProvider from "@/provider/ResetPasswordProvider";

const SetNewPasswordPage = () => {
  return (
    <section className="h-screen px-4 lg:px-44 flex flex-col lg:flex-row items-center lg:justify-between ">
      <LoginText />
      <ResetPasswordProvider />
    </section>
  );
};

export default SetNewPasswordPage;
