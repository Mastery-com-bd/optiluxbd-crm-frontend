import LockScreen from "@/components/auth/LockScreen";

const LockScreenPage = () => {
  return (
    <section className="min-h-screen bg-[#f5f6f8] flex flex-col items-center justify-center space-y-6">
      <LockScreen />
      <p className="text-sm text-gray-500">
        © <span>{new Date().getFullYear()}</span> Mastery — by Team Mastery
      </p>
    </section>
  );
};

export default LockScreenPage;
