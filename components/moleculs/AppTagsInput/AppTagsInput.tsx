import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import React, { useState, ChangeEvent, KeyboardEvent, useMemo } from "react";

interface AppTagsInputProps {
  tags?: string[];
  availableTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const AppTagsInput: React.FC<AppTagsInputProps> = ({
  tags = [],
  onTagsChange,
  availableTags,
}) => {
  const notSelectedTags = useMemo(
    () =>
      availableTags.filter(
        (tag) =>
          !tags.map((t) => t.toLowerCase()).includes(tag.toLocaleLowerCase())
      ),
    [availableTags, tags]
  );

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);

    onTagsChange(newTags);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge
          key={index}
          className="cursor-pointer"
          onClick={() => removeTag(tag)}
        >
          {tag}
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
            {"Select tags..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            <CommandInput placeholder="Search tags..." className="h-9" />
            <CommandEmpty>Tap `Enter` to save as a tag.</CommandEmpty>
            <CommandGroup>
              {notSelectedTags.map((t, i) => (
                <CommandItem
                  key={i}
                  value={t}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onTagsChange([...tags, currentValue]);
                  }}
                >
                  {t}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AppTagsInput;
