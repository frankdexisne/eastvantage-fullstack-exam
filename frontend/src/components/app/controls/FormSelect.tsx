import Select from "react-select";
import type { RegisterOptions, Control } from "react-hook-form";
import { useController } from "react-hook-form";
import { Label } from "../../ui/label";
import type { IOptionType } from "../../../store/slices/select";

interface IFormSelect {
  label: string;
  name: string;
  control: Control<any, string | number>;
  rules?: RegisterOptions;
  isMulti?: true | undefined;
  options: IOptionType[];
}

export default function FormSelect({
  label,
  name,
  control,
  rules = {},
  isMulti = undefined,
  options,
}: IFormSelect) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    control: control,
    name: name,
    defaultValue: "",
    rules: rules,
  });

  return (
    <div className="grid w-full gap-3 mb-2">
      <Label>{label}</Label>
      <Select
        isMulti={isMulti}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        options={options}
      />
      {invalid && error && (
        <small className="text-red-500">{error.message}</small>
      )}
    </div>
  );
}
