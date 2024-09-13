import { TypeOfInput } from "@/Types";
import { useState } from "react";

type UserInputProps = {
  label: string;
  placeholder: string;
  name?: string;
  register?: any;
};

type UserSelectProps = {
  label: string;
  options: any;
  register?: any;
  name?: string;
};

const UserInput = ({ label, placeholder, name, register }: UserInputProps) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <textarea
        className="w-full h-40 bg-main mt-2 p-6 border border-border rounded "
        placeholder={placeholder}
        {...register}
        name={name}
      ></textarea>
    </div>
  );
};

const Select = ({ label, options, register, name }: UserSelectProps) => {
  return (
    <>
      <label className="text-border font-semibold">{label}</label>
      <select
        className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded"
        {...register}
        name={name}
      >
        {options?.map((option: any, index: any) => (
          <option key={index} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </>
  );
};

const Inputs = ({
  label,
  placeholder,
  type,
  bg,
  register,
  name,
  value,
  onChange,
  disabled,
}: TypeOfInput) => {
  return (
    <div className="text-sm w-full relative">
      <label className="text-border font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...register}
        placeholder={placeholder}
        className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
          bg ? "bg-main" : "bg-dry"
        }`}
        disabled={disabled ? true : false}
      />
    </div>
  );
};

export { UserInput, Select, Inputs };
