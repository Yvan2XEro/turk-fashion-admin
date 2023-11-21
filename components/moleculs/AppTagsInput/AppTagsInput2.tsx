import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type TProps = {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
};
export default function AppTagsInput2({ tags, onTagsChange }: TProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      onTagsChange([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagClick = (clickedTag: string) => {
    const newTags = tags.filter((tag) => tag !== clickedTag);
    onTagsChange(newTags);
  };
  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        {tags?.map((tag, index) => (
          <Badge
            className="cursor-pointer"
            onClick={() => handleTagClick(tag)}
            key={index}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Input
        type="text"
        value={inputValue}
        className="mt-2"
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        placeholder="Add item"
      />
    </div>
  );
}
