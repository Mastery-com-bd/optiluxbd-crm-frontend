import Image from "next/image";
import { TMemberData } from "./Members";
import { Award, Mail, Phone, TrendingUp } from "lucide-react";

const MembersCard = ({ data }: { data: TMemberData }) => {
  return (
    <div className="relative bg-white/5 rounded-3xl p-4">
      {/* top and bottom border */}
      <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />

      {/* main content */}
      <div className="flex items-start gap-4">
        {/* image section */}
        <div className="h-11 w-11 rounded-full ">
          <Image
            src={
              data?.image ??
              "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?auto=format&fit=crop&w=687&q=80"
            }
            height={100}
            width={100}
            alt="member image"
            className="h-full w-full rounded-full"
          />
        </div>

        {/* others content section */}
        <div className="space-y-2 w-full ">
          <h1 className="text-base">{data?.name}</h1>
          <div className="flex items-center gap-6">
            <p className="text-sm text-text-secondary flex items-end gap-1">
              <span className="text-alternative">
                <Mail size={14} />
              </span>
              <span className="leading-4 ">{data?.email}</span>
            </p>
            <p className="text-sm text-text-secondary flex items-end gap-1">
              <span className="text-success ">
                <Phone size={14} />
              </span>
              <span className="leading-4 ">{data?.phone}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 w-3/4 pt-2">
            {/* first card */}
            <div className="bg-white/10 relative rounded-3xl px-4 py-3 w-full">
              {/* top and bottom border */}
              <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />
              <div className="space-y-1">
                <p className="text-sm text-text-secondary flex items-end gap-1">
                  <span className="text-alternative">
                    <Phone size={14} />
                  </span>
                  <span className="leading-4 ">Calls Today</span>
                </p>
                <h1 className="text-lg font-semibold">{data?.calls}</h1>
              </div>
            </div>

            {/* second card */}
            <div className="bg-white/10 relative rounded-3xl px-4 py-3 w-full">
              {/* top and bottom border */}
              <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />
              <div className="space-y-1">
                <p className="text-sm text-text-secondary flex items-end gap-1">
                  <span className="text-success">
                    <TrendingUp size={14} />
                  </span>
                  <span className="leading-4 ">Conversion</span>
                </p>
                <h1 className="text-lg font-semibold text-success">
                  {data?.conversionRate}
                </h1>
              </div>
            </div>

            {/* third card */}
            <div className="bg-white/10 relative rounded-3xl px-4 py-3 w-full">
              {/* top and bottom border */}
              <div className="absolute top-0 left-px inset-5.5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-px inset-5.5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />
              <div className="space-y-1">
                <p className="text-sm text-brand flex items-end gap-1">
                  <span>
                    <Award size={14} />
                  </span>
                  <span className="leading-4 ">Rank</span>
                </p>
                <h1 className="text-lg font-semibold text-brand">
                  #{data?.rank}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersCard;
