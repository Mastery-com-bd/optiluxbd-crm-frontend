import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { SettingsFormValues } from "./CreateSettings";

type SocialFieldProps = {
  label: string;
  name: keyof SettingsFormValues;
  control: Control<SettingsFormValues>;
  setValue: UseFormSetValue<SettingsFormValues>;
};

const SocialField = ({ label, name, control, setValue }: SocialFieldProps) => {
  // get current array safely
  const values = useWatch({
    control,
    name,
  }) as string[];

  const handleChange = (index: number, value: string) => {
    const newArr = [...values];
    newArr[index] = value;
    setValue(name, newArr, { shouldValidate: true });
  };

  const handleAdd = () => {
    if (values.length < 5)
      setValue(name, [...values, ""], { shouldValidate: true });
  };

  const handleRemove = (index: number) => {
    const newArr = values.filter((_, i) => i !== index);
    setValue(name, newArr, { shouldValidate: true });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="space-y-2">
          <FormLabel>{label}</FormLabel>
          {values.map((val, idx) => (
            <FormControl key={idx}>
              <div className="flex items-center gap-2">
                <Input
                  placeholder={`Enter ${label} link`}
                  onChange={(e) => handleChange(idx, e.target.value)}
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemove(idx)}
                >
                  Delete
                </button>
              </div>
            </FormControl>
          ))}
          <button
            type="button"
            className="mt-1 text-blue-500"
            onClick={handleAdd}
            disabled={values.length >= 5}
          >
            Add Link
          </button>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SocialField;
