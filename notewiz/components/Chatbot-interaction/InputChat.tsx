import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InputChat() {
  return (
    <div className="flex w-full  items-center space-x-2  justify-between p-2 shadow-xl">
      <Input type="text" placeholder="Text" />
      <Button type="submit">Enter</Button>
    </div>
  );
}
