import LoginComponent from "@/components/auth/login/LoginComponent";
import LoginText from "@/components/auth/login/LoginText";

const LoginPage = () => {
  return (
    <section className="h-screen px-4 lg:px-44 flex flex-col lg:flex-row items-center lg:justify-between ">
      <LoginText />
      <LoginComponent />
    </section>
  );
};

export default LoginPage;
