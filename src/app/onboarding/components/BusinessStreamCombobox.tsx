"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BusinessStreamResponse } from "@/services/recruiter-organization-service";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface BusinessStreamComboboxProps {
  value: number | undefined;
  onChange: (id: number) => void;
  options: BusinessStreamResponse[];
  disabled?: boolean;
  error?: boolean;
}

export default function BusinessStreamCombobox({
  value,
  onChange,
  options,
  disabled,
  error,
}: BusinessStreamComboboxProps) {
  const [open, setOpen] = useState(false);
  const selectedStream = options.find((stream) => stream.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            error && "border-red-500",
          )}
        >
          {disabled
            ? "Loading industries..."
            : selectedStream
              ? selectedStream.businessName
              : options.length === 0
                ? "No industries available"
                : "Search industry..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search industry..." />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No industry found.</CommandEmpty>
            <CommandGroup>
              {options.map(
                (stream) => (
                  console.log("stream", stream),
                  (
                    <CommandItem
                      key={stream.id}
                      value={stream.businessName}
                      onSelect={() => {
                        onChange(stream.id);
                        setOpen(false);
                      }}
                      className="flex cursor-pointer items-center justify-between capitalize"
                    >
                      <span>{stream.businessName}</span>
                      <Check
                        className={cn(
                          "h-4 w-4",
                          value === stream.id ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  )
                ),
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
