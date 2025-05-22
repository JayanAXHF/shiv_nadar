"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./navbar";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { atom, useAtom } from "jotai";
import { Slider } from "./ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  className?: string;
}

const max_length_atom = atom(100);
const check_circulars_atom = atom(false);
const temperate_atom = atom(0.7);

export { max_length_atom, check_circulars_atom, temperate_atom };

const Controls = ({ className, ...props }: Props) => {
  const [_max_length, setMaxLength] = useAtom<number>(max_length_atom);
  const [check_circulars, setCheckCirculars] =
    useAtom<boolean>(check_circulars_atom);
  const [_temperature, setTemperature] = useAtom<number>(temperate_atom);

  return (
    <TooltipProvider>
      <div className="flex items-start gap-4 flex-col absolute right-0 my-auto min-w-max">
        <div
          className={cn(
            "border border-black/[0.2] dark:border-white/[0.2]  max-w-sm md:ml-5 p-8 relative mb-2 mr-auto flex flex-col gap-8",
            className,
          )}
          {...props}
        >
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />

          <div className="grid gap-6">
            <div className="flex gap-2 flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="w-max text-sm font-medium leading-none mb-0">
                    Model
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm/5 tracking-wide pb-2">
                    Select the model you want to use.
                  </p>
                </TooltipContent>
              </Tooltip>
              <div className="flex			items-center gap-2">
                <Switch
                  id="assigment_toggle"
                  onCheckedChange={setCheckCirculars}
                  checked={check_circulars}
                  className="hidden md:block"
                />
                <Label
                  htmlFor="assigment_toggle"
                  className="mr-5 w-max min-w-32 hidden md:block "
                >
                  {check_circulars ? "Checking Circulars" : "Only NCERT"}
                </Label>
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="w-max text-sm font-medium leading-none">
                    Maximum Length
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm/5 tracking-wide pb-2">
                    Maximum token length of the model. Longer
                    <br />
                    tokens will be take longer to generate.
                  </p>
                </TooltipContent>
              </Tooltip>
              <Input
                onChange={(e) => {
                  setMaxLength(parseInt(e.target.value));
                }}
                placeholder="Max Length"
                className="hidden md:block"
              />
            </div>
            <div className="flex gap-2 flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="w-max text-sm font-medium leading-none">
                    Temperature
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm/5 tracking-wide">
                    Adjust the temperature of the model. Higher temperatures
                    <br />
                    will make the model more creative, while lower temperatures{" "}
                    <br />
                    will make it more predictable.
                  </p>
                </TooltipContent>
              </Tooltip>
              <div className="flex gap-x-2">
                <Slider
                  defaultValue={[0.7]}
                  max={1}
                  step={0.1}
                  onValueChange={(val) => setTemperature(val[0]!)}
                />
                <div className="relative flex h-10 w-12 items-center justify-center border-y border-x rounded-md border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md">
                  {_temperature}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Controls;
