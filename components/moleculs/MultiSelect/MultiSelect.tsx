import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import React, { useState, useMemo } from "react";

interface Option {
  label: string;
  uuid: string;
}

interface MultiSelectProps {
  value?: string[];
  options: Option[];
  onTagsChange: (value: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  value = [],
  onTagsChange,
  options,
}) => {
  const notSelectedOptions = useMemo(
    () => options.filter((option) => !value.includes(option.uuid)),
    [options, value]
  );

  const removeTag = (tagToRemove: string) => {
    const newTags = value.filter((tag) => tag !== tagToRemove);
    onTagsChange(newTags);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      {value.map((tag, index) => (
        <Badge
          key={index}
          className="cursor-pointer"
          onClick={() => removeTag(tag)}
        >
          {options.find((opt) => opt.uuid === tag)?.label || tag}
        </Badge>
      ))}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" justify-between w-full"
          >
            {"Select items..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            <CommandInput placeholder="Search items..." className="h-9" />
            <CommandEmpty>Not found!</CommandEmpty>
            <CommandGroup>
              {notSelectedOptions.map((option, i) => (
                <CommandItem
                  key={i}
                  value={option.label}
                  onSelect={() => {
                    setOpen(false);
                    onTagsChange([...value, option.uuid]);
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelect;
