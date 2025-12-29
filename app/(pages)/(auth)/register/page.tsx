import LoginText from "@/components/auth/login/LoginText";
import RegisterComponent from "@/components/auth/register/RegisterComponent";

const RegistrationPage = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-x-6 lg:gap-x-56">
      <LoginText />
      <RegisterComponent />
    </section>
  );
};

export default RegistrationPage;
