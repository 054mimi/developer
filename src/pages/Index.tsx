import { useState, useEffect } from "react";
import { BaseSelector } from "@/components/BaseSelector";
import { NumberInput } from "@/components/NumberInput";
import { ResultDisplay } from "@/components/ResultDisplay";
import { Keypad } from "@/components/Keypad";
import { Calculator } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [fromBase, setFromBase] = useState("dec");
  const [toBase, setToBase] = useState("bin");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const patterns: Record<string, RegExp> = {
    bin: /^[01]+$/,
    oct: /^[0-7]+$/,
    dec: /^[0-9]+$/,
    hex: /^[0-9A-F]+$/
  };

  const baseMap: Record<string, number> = {
    bin: 2,
    oct: 8,
    dec: 10,
    hex: 16
  };

  const handleKeyPress = (key: string) => {
    setInputValue((prev) => prev + key);
  };

  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInputValue("");
  };

  useEffect(() => {
    if (!inputValue) {
      setResult("");
      setError("");
      return;
    }

    if (!patterns[fromBase].test(inputValue)) {
      setError(`Invalid input for ${fromBase.toUpperCase()}`);
      setResult("");
      return;
    }

    setError("");

    try {
      const decimal = parseInt(inputValue, baseMap[fromBase]);
      let converted = "";

      if (toBase === "dec") {
        converted = decimal.toString();
      } else if (toBase === "bin") {
        converted = decimal.toString(2);
      } else if (toBase === "oct") {
        converted = decimal.toString(8);
      } else if (toBase === "hex") {
        converted = decimal.toString(16).toUpperCase();
      }

      setResult(converted);
    } catch (err) {
      setError("Conversion error");
      setResult("");
    }
  }, [inputValue, fromBase, toBase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg">
            <Calculator className="w-8 h-8 text-background" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
              PROGRAMMER'S CALC
            </h1>
            <p className="text-muted-foreground mt-2">Convert between number bases instantly</p>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl space-y-6">
          {/* Base Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseSelector
              label="Convert From"
              value={fromBase}
              onChange={setFromBase}
              disabledValue={toBase}
            />
            <BaseSelector
              label="Convert To"
              value={toBase}
              onChange={setToBase}
              disabledValue={fromBase}
            />
          </div>

          <div className="border-t border-border" />

          {/* Input */}
          <NumberInput
            base={fromBase}
            value={inputValue}
            onChange={setInputValue}
            error={error}
          />

          {/* Result */}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ResultDisplay base={toBase} result={result} />
            </div>
          )}

          <div className="border-t border-border" />

          {/* Keypad */}
          <Keypad
            base={fromBase}
            onKeyPress={handleKeyPress}
            onDelete={handleDelete}
            onClear={handleClear}
          />
        </div>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>Supports Binary, Octal, Decimal, and Hexadecimal conversions</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
