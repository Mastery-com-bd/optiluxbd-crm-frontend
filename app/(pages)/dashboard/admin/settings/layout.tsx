import SettingsNavbar from "@/components/pages/dashboard/admin/settings/SettingsNavbar";
import SettingsSidebar from "@/components/pages/dashboard/admin/settings/SettingsSidebar";

const SettingsLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="m-4">
            <SettingsNavbar />
            <div className="lg:flex">
                <div className="lg:w-[20%] mt-4">
                    <SettingsSidebar />
                </div>
                <div className=" w-full mt-4 lg:ml-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;