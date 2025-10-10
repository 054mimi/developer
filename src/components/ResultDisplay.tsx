import { Card } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ResultDisplayProps {
  base: string;
  result: string;
}

export const ResultDisplay = ({ base, result }: ResultDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const baseLabels: Record<string, string> = {
    bin: "Binary",
    oct: "Octal",
    dec: "Decimal",
    hex: "Hexadecimal"
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/30 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse" />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {baseLabels[base]} Result
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0 hover:bg-primary/20"
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground hover:text-primary" />
            )}
          </Button>
        </div>
        <p className="mono text-3xl font-bold text-foreground break-all">
          {result}
        </p>
      </div>
    </Card>
  );
};
