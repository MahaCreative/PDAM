import React from "react";
import CurrencyInput from "react-currency-input-field";

export default function InputUang({
    title,
    errors,
    classname,
    width = "w-full",
    ...props
}) {
    return (
        <div className="w-full">
            <p className="text-xs dark:text-white capitalize">{title}</p>
            <CurrencyInput
                prefix="Rp. "
                {...props}
                className={` disabled:bg-gray-200 text-sm focus:outline-none focus:border-none active:outline-none active:border-none rounded-md dark:text-white dark:bg-gray-950  outline-none ${classname} disabled:bg-slate-100 block disabled:dark:bg-slate-900 ${width}`}
            />
            {errors && (
                <p className="text-xs text-red-600 italic pt-1">{errors}</p>
            )}
        </div>
    );
}
