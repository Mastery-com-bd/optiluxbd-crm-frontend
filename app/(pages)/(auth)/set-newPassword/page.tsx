import SetNewPassword from "@/components/auth/SetNewPassword";

const SetNewPasswordPage = () => {
  return (
    <section className="min-h-screen bg-[#f5f6f8] flex flex-col items-center justify-center space-y-6">
      <SetNewPassword />
      <p className="text-sm text-gray-500">
        © <span>{new Date().getFullYear()}</span> Mastery — by Team Mastery
      </p>
    </section>
  );
};

export default SetNewPasswordPage;
