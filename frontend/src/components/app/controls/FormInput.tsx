import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import type { HTMLInputTypeAttribute } from "react";
import {
  type Control,
  type RegisterOptions,
  useController,
} from "react-hook-form";

interface IFormInput {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  control: Control<any, string | number>;
  rules: RegisterOptions;
}

export default function FormInput({
  label,
  name,
  control,
  rules,
  type = "text",
}: IFormInput) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
    rules,
    defaultValue: "",
  });
  return (
    <div className="grid w-full gap-3 mb-2">
      <Label>{label}</Label>
      <Input
        type={type}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value as string | number | readonly string[] | undefined}
      />
      {invalid && error && (
        <small className="text-red-500">{error.message}</small>
      )}
    </div>
  );
}
