import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface BaseSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  disabledValue?: string;
}

const bases = [
  { value: "bin", label: "Binary (BIN)" },
  { value: "oct", label: "Octal (OCT)" },
  { value: "dec", label: "Decimal (DEC)" },
  { value: "hex", label: "Hexadecimal (HEX)" }
];

export const BaseSelector = ({ label, value, onChange, disabled, disabledValue }: BaseSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full bg-input border-border hover:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/50">
          <SelectValue placeholder="Select base" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {bases.map((base) => (
            <SelectItem 
              key={base.value} 
              value={base.value}
              disabled={base.value === disabledValue}
              className="hover:bg-accent/20 focus:bg-accent/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {base.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
