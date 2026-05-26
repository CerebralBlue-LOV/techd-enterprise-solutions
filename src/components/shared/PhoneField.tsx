import * as React from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

/**
 * Branded wrapper around react-phone-number-input.
 * - Country selector + national number, stored as a single E.164 string.
 * - Styled to match the form's other inputs (h-12, branded focus ring).
 */
type Props = {
  value?: string;
  onChange: (value?: string) => void;
  onBlur?: () => void;
  defaultCountry?: Country;
  placeholder?: string;
  className?: string;
  invalid?: boolean;
};

const PhoneField = React.forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, onBlur, defaultCountry = "US", placeholder, className, invalid }, ref) => {
    return (
      <PhoneInput
        ref={ref as never}
        international
        defaultCountry={defaultCountry}
        countryCallingCodeEditable={false}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder ?? "Phone number"}
        numberInputProps={{
          className: cn(
            "h-12 flex-1 rounded-md border bg-background/70 px-3 text-sm outline-none transition-all duration-200",
            "border-border/70 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/40",
            invalid && "border-destructive focus:ring-destructive/30",
          ),
        }}
        className={cn("phone-field flex items-center gap-2", className)}
      />
    );
  },
);
PhoneField.displayName = "PhoneField";

export default PhoneField;
