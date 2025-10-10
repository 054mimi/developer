import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

interface KeypadProps {
  base: string;
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

export const Keypad = ({ base, onKeyPress, onDelete, onClear }: KeypadProps) => {
  const allKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", "A", "B", "C", "D", "E", "F"
  ];

  const validKeys: Record<string, string[]> = {
    bin: ["0", "1"],
    oct: ["0", "1", "2", "3", "4", "5", "6", "7"],
    dec: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    hex: allKeys
  };

  const isKeyValid = (key: string) => validKeys[base].includes(key);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {allKeys.map((key) => {
          const isValid = isKeyValid(key);
          return (
            <Button
              key={key}
              onClick={() => isValid && onKeyPress(key)}
              disabled={!isValid}
              variant={isValid ? "default" : "outline"}
              className={`h-14 text-lg font-semibold mono transition-all ${
                isValid 
                  ? "bg-primary/20 hover:bg-primary/30 text-primary border-primary/40" 
                  : "bg-muted/30 text-muted-foreground/30 cursor-not-allowed border-border/30"
              }`}
            >
              {key}
            </Button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={onDelete}
          variant="destructive"
          className="h-14 text-base font-semibold"
        >
          <Delete className="w-5 h-5 mr-2" />
          Delete
        </Button>
        <Button
          onClick={onClear}
          variant="secondary"
          className="h-14 text-base font-semibold"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
