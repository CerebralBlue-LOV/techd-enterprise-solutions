import * as React from "react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
  AsYouType,
  type CountryCode,
} from "libphonenumber-js";
import en from "react-phone-number-input/locale/en.json";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

/**
 * Branded phone field: searchable country combobox + national number input.
 * Value is stored as a single E.164 string (e.g. "+14155552671").
 */

const COUNTRY_NAMES = en as Record<string, string>;

const COUNTRIES: CountryCode[] = getCountries().sort((a, b) =>
  (COUNTRY_NAMES[a] || a).localeCompare(COUNTRY_NAMES[b] || b),
);

/** Convert "US" → "🇺🇸" via regional-indicator code points. */
function flagEmoji(country: CountryCode): string {
  return country
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}

type Props = {
  value?: string;
  onChange: (value?: string) => void;
  onBlur?: () => void;
  defaultCountry?: CountryCode;
  placeholder?: string;
  className?: string;
  invalid?: boolean;
};

const PhoneField = React.forwardRef<HTMLInputElement, Props>(
  (
    { value, onChange, onBlur, defaultCountry = "US", placeholder, className, invalid },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    // Derive selected country + national portion from the stored E.164 value.
    const parsed = React.useMemo(
      () => (value ? parsePhoneNumberFromString(value) : undefined),
      [value],
    );
    const country: CountryCode = (parsed?.country as CountryCode) || defaultCountry;
    const nationalDisplay = React.useMemo(() => {
      if (!value) return "";
      const formatter = new AsYouType(country);
      // Strip the country prefix so the input shows only the national part.
      const dial = `+${getCountryCallingCode(country)}`;
      const local = value.startsWith(dial) ? value.slice(dial.length) : value;
      return formatter.input(local);
    }, [value, country]);

    const handleCountrySelect = (next: CountryCode) => {
      setOpen(false);
      const dial = `+${getCountryCallingCode(next)}`;
      // Keep digits the user already typed when switching country.
      const digits = (nationalDisplay || "").replace(/\D/g, "");
      onChange(digits ? `${dial}${digits}` : dial);
    };

    const handleNumberChange = (raw: string) => {
      let digits = raw.replace(/\D/g, "");
      if (!digits) return onChange("");
      const dial = `+${getCountryCallingCode(country)}`;
      // Reject extra digits past the country's max national length.
      while (
        digits.length > 0 &&
        validatePhoneNumberLength(`${dial}${digits}`, country) === "TOO_LONG"
      ) {
        digits = digits.slice(0, -1);
      }
      onChange(`${dial}${digits}`);
    };

    return (
      <div className={cn("flex items-stretch gap-2", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              role="combobox"
              aria-expanded={open}
              aria-label="Select country"
              className={cn(
                "group inline-flex h-12 shrink-0 items-center gap-2 rounded-md border border-border/70 bg-background/70 px-3 text-sm transition-all duration-200",
                "hover:border-primary hover:text-primary",
                "focus:outline-none focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/40",
                open && "border-primary bg-background ring-2 ring-primary/40",
                invalid && "border-destructive focus:ring-destructive/30",
              )}
            >
              <span className="text-lg leading-none" aria-hidden>
                {flagEmoji(country)}
              </span>
              <span className="font-bold tabular-nums text-secondary">
                +{getCountryCallingCode(country)}
              </span>
              <ChevronDown
                className={cn(
                  "size-3.5 text-muted-foreground transition-transform duration-200",
                  open && "rotate-180 text-primary",
                )}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={8}
            className="w-[320px] p-0 overflow-hidden rounded-lg border-border/80 shadow-[0_24px_48px_-20px_hsl(var(--primary)/0.25)]"
          >
            <Command
              filter={(itemValue, search) => {
                // itemValue is "{name}__{code}__{dial}" — match any token.
                const q = search.toLowerCase().trim();
                if (!q) return 1;
                return itemValue.toLowerCase().includes(q) ? 1 : 0;
              }}
            >
              <div className="flex items-center gap-2 border-b border-border/60 px-3">
                <Search className="size-4 text-muted-foreground" />
                <CommandInput
                  placeholder="Search country or code…"
                  className="h-11 border-0 px-0 focus:ring-0"
                />
              </div>
              <CommandList className="max-h-72">
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  No country found.
                </CommandEmpty>
                <CommandGroup className="p-1">
                  {COUNTRIES.map((c) => {
                    const name = COUNTRY_NAMES[c] || c;
                    const dial = getCountryCallingCode(c);
                    const selected = c === country;
                    return (
                      <CommandItem
                        key={c}
                        value={`${name}__${c}__+${dial}`}
                        onSelect={() => handleCountrySelect(c)}
                        className={cn(
                          "group/item flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-sm",
                          "data-[selected=true]:bg-primary/10 data-[selected=true]:text-secondary",
                          selected && "bg-primary/5",
                        )}
                      >
                        <span className="text-lg leading-none" aria-hidden>
                          {flagEmoji(c)}
                        </span>
                        <span className="flex-1 truncate font-normal">{name}</span>
                        <span className="font-bold tabular-nums text-muted-foreground group-data-[selected=true]/item:text-primary">
                          +{dial}
                        </span>
                        {selected && (
                          <Check className="size-4 text-primary" />
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Input
          ref={ref}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={placeholder ?? "(555) 123-4567"}
          value={nationalDisplay}
          onChange={(e) => handleNumberChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={invalid || undefined}
          className={cn(
            "h-12 flex-1 bg-background/70 border-border/70 focus-visible:ring-primary/40 focus-visible:border-primary focus-visible:bg-background transition-all duration-200",
            invalid && "border-destructive focus-visible:ring-destructive/30",
          )}
        />
      </div>
    );
  },
);
PhoneField.displayName = "PhoneField";

export default PhoneField;
