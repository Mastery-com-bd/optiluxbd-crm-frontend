import Footer from "@/components/pages/shared/home/Footer";
import Navbar, { TSocialUser } from "@/components/pages/shared/home/Navbar";
import authOptions from "@/utills/authOptions";
import { getServerSession } from "next-auth";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar user={session?.user as TSocialUser} />
      <main className="min-h-screen ">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
