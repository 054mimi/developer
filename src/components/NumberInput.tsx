import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface NumberInputProps {
  base: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const NumberInput = ({ base, value, onChange, error }: NumberInputProps) => {
  const baseLabels: Record<string, string> = {
    bin: "Binary",
    oct: "Octal",
    dec: "Decimal",
    hex: "Hexadecimal"
  };

  const placeholders: Record<string, string> = {
    bin: "e.g., 1010",
    oct: "e.g., 755",
    dec: "e.g., 42",
    hex: "e.g., 2A"
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Enter {baseLabels[base]} Number
      </Label>
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder={placeholders[base]}
          className="mono text-lg bg-input border-border hover:border-primary focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/50 pr-10"
        />
        {error && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}
    </div>
  );
};
