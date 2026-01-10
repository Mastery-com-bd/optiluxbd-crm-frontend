import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type TSwitcherProps = {
  data: boolean;
  title: "email" | "sms" | "push" ;
  onChange: (checked: boolean) => void;
};

const bgMap = {
  email: "data-[state=checked]:bg-[rgba(0,166,86,0.20)]",
  sms: "data-[state=checked]:bg-[rgba(42,133,255,0.20)]",
  push: "data-[state=checked]:bg-[rgba(127,95,255,0.20)]",
};

const Switcher = ({ data, title, onChange }: TSwitcherProps) => {
     const [checked, setChecked] = useState<boolean>(data);
    
  return (
    <Switch
      checked={checked}
      onCheckedChange={(value) => {
        setChecked(value); 
        onChange(value); 
      }}
      className={`
        h-7 w-12 p-1 cursor-pointer
        data-[state=unchecked]:bg-white/20
        ${bgMap[title]}
        [&>span]:bg-white!
        data-[state=checked]:[&>span]:translate-x-6
      `}
    />
  );
};

export default Switcher;
