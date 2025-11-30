import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  title: string;
  desc: string;
  buttonText: string;
  link?: string;
}

const CouriarDashboardHeader = ({ title, desc, buttonText, link }: Props) => {
  return (
    <div>
      {/* Heading & Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {desc}
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href={link || "#"}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default CouriarDashboardHeader;
