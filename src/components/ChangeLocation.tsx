import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LocationMap from "./LocationMap";

const ChangeLocation = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex-1" asChild>
        <Button className="bg-zinc-200" variant="outline">
          Change Location
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 z-[1000] ">
        <LocationMap />
      </PopoverContent>
    </Popover>
  );
};

export default ChangeLocation;
