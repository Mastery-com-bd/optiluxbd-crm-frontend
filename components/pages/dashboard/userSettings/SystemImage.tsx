"use client";

import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TUserSettings } from "@/types/settings/userSettings.types";

const SystemImage = ({ settings }: { settings: TUserSettings }) => {
  console.log(settings);
  return (
    <Card className="effect">
      <CardHeader>
        <CardTitle>System Logo and Favicon Update</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        this is logo and favicon
      </CardContent>

      <CardFooter>
        <div className="flex justify-end w-full gap-6">
          <Button
            variant="outline"
            type="button"
            className="cursor-pointer text-sm"
          >
            Reset Social Links
          </Button>

          <ButtonComponent
            buttonName="Save Changes"
            varient="yellow"
            type="button"
            className="h-10 px-6 rounded-2xl"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SystemImage;
