import LoginText from "@/components/auth/login/LoginText";
import RegisterComponent from "@/components/auth/register/RegisterComponent";

const RegistrationPage = () => {
  return (
    <section className="h-screen px-4 lg:px-44 flex flex-col lg:flex-row items-center lg:justify-between ">
      <LoginText />
      <RegisterComponent />
    </section>
  );
};

export default RegistrationPage;
