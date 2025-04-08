import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none border-r"
        onClick={onDecrement}
        disabled={quantity <= min}
      >
        <span className="sr-only">Decrease quantity</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M5 12h14" />
        </svg>
      </Button>
      
      <div className="w-14 text-center">
        <span className="text-sm">{quantity}</span>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none border-l"
        onClick={onIncrement}
        disabled={quantity >= max}
      >
        <span className="sr-only">Increase quantity</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </Button>
    </div>
  );
}