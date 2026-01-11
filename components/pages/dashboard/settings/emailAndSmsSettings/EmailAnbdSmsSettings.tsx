"uase client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import SmtpConfigura from "./SmtpConfigura";
import SmsGateway from "./SmsGateway";

const EmailAnbdSmsSettings = () => {
  return (
    <div className="space-y-6">
      {/* header section */}
      <div className="flex items-center justify-between ">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold leading-8">
            Email & SMS Settings
          </h1>
          <p className="text-[#A1A1A1] leading-5">
            Configure email SMTP and SMS gateway settings
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <ButtonComponent buttonName="Add New User" varient="full yellow" />
        </div>
      </div>

      {/* left section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SmtpConfigura />
        <SmsGateway />
      </div>
    </div>
  );
};

export default EmailAnbdSmsSettings;
