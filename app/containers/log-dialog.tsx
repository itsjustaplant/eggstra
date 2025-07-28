import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSubmit } from "react-router";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "~/components/";
import { TEXTS } from "~/texts";

type TButton = {
  icon: IconProp;
  text: string;
  key: string;
  label: string;
  proteinMultiplier: number;
  waterMultiplier?: number;
};
const buttonsMap: Array<TButton> = [
  {
    icon: "drumstick-bite",
    text: "Chicken",
    key: "chicken",
    label: "g",
    proteinMultiplier: 0.31,
  },
  {
    icon: "cow",
    text: "Meat",
    key: "meat",
    label: "g",
    proteinMultiplier: 0.26,
  },
  {
    icon: "egg",
    text: "Egg",
    key: "egg",
    label: "piece",
    proteinMultiplier: 6,
  },
  {
    icon: "bacon",
    text: "Smoked Turkey",
    key: "smoked-turkey",
    label: "piece",
    proteinMultiplier: 8.5,
  },
  {
    icon: "fish",
    text: "Salmon",
    key: "salmon",
    label: "g",
    proteinMultiplier: 0.2,
  },
  {
    icon: "fish-fins",
    text: "Tuna",
    key: "tuna",
    label: "g",
    proteinMultiplier: 0.25,
  },
  {
    icon: "bottle-water",
    text: "Water",
    key: "water",
    label: "mL",
    proteinMultiplier: 0,
    waterMultiplier: 1,
  },
  {
    icon: "glass-water",
    text: "Milk",
    key: "milk",
    label: "mL",
    proteinMultiplier: 0.03,
  },
  {
    icon: "dna",
    text: "WHEY",
    key: "whey",
    label: "scoop",
    proteinMultiplier: 22,
  },
  {
    icon: "gear",
    text: "Custom",
    key: "custom",
    label: "g",
    proteinMultiplier: 1,
  },
];

function LogDialog(props: React.PropsWithChildren<unknown>) {
  const { children } = props;
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [value, setValue] = useState("");
  const submit = useSubmit();

  return (
    <Dialog>
      <DialogTrigger className="ml-auto">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>{TEXTS["dialog-title"]}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Please choose intake type and enter the amount of intake you took.
        </DialogDescription>
        <div className="flex gap-2 flex-wrap">
          {buttonsMap.map((button, index) => (
            <Button
              onClick={() => {
                setSelectedItemId(index);
              }}
              className="cursor-pointer"
              variant={index === selectedItemId ? "default" : "secondary"}
              key={button.icon as string}
            >
              <span>{button.text}</span>
              <FontAwesomeIcon size="lg" icon={button.icon} />
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input
            className="w-20"
            value={value}
            type="number"
            onChange={(e) => setValue(e?.target?.value)}
          />
          <span>{buttonsMap[selectedItemId].label}</span>
          <Button
            disabled={!value}
            onClick={async (e) => {
              submit(
                {
                  protein:
                    Number(value) *
                    buttonsMap[selectedItemId].proteinMultiplier,
                  water:
                    Number(value) *
                    (buttonsMap[selectedItemId]?.waterMultiplier || 0),
                },
                { method: "POST" }
              );
              e.preventDefault();
              e.stopPropagation();
            }}
            className="cursor-pointer ml-auto disabled:cursor-not-allowed"
          >
            {TEXTS["dialog-action"]}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { LogDialog };
