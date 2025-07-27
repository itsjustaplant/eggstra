import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
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
};
const buttonsMap: Array<TButton> = [
  { icon: "drumstick-bite", text: "Chicken", key: "chicken", label: "g" },
  { icon: "cow", text: "Meat", key: "meat" , label: "g"},
  { icon: "egg", text: "Egg", key: "egg" , label: "g"},
  { icon: "bacon", text: "Smoked Turkey", key: "smoked-turkey", label: "g" },
  { icon: "fish", text: "Salmon", key: "salmon" , label: "g"},
  { icon: "fish-fins", text: "Tuna", key: "tuna" , label: "g"},
  { icon: "bottle-water", text: "Water", key: "water" , label: "ml"},
  { icon: "glass-water", text: "Milk", key: "milk" , label: "ml"},
  { icon: "dna", text: "WHEY", key: "whey" , label: "g"},
  { icon: "gear", text: "Custom", key: "custom" , label: "g"},
];

function LogDialog(props: React.PropsWithChildren<{}>) {
  const { children } = props;
  const [selected, setSelected] = useState(0);
  const [input, setInput] = useState("");

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
                setSelected(index);
                setInput("");
              }}
              className="cursor-pointer"
              variant={index === selected ? "default" : "secondary"}
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
            value={input}
            type="number"
            onChange={(e) => setInput(e?.target?.value)}
          />
          <span>{buttonsMap[selected].label}</span>
          <Button className="cursor-pointer ml-auto">{TEXTS["dialog-action"]}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { LogDialog };
