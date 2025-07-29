import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";
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
import { ITEM_MAP } from "~/constants";
import { TEXTS } from "~/texts";

function LogDialog(props: React.PropsWithChildren<unknown>) {
  const { children } = props;
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [value, setValue] = useState("");
  const fetcher = useFetcher();
  const selectedItem = ITEM_MAP[selectedItemId];

  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>{TEXTS["dialog-title"]}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Please choose intake type and enter the amount of intake you took.
        </DialogDescription>
        <div className="flex gap-2 flex-wrap">
          {ITEM_MAP.map((item, index) => (
            <Button
              onClick={() => {
                setSelectedItemId(index);
              }}
              className="cursor-pointer"
              variant={index === selectedItemId ? "default" : "secondary"}
              key={item.icon as string}
            >
              <span>{item.text}</span>
              <FontAwesomeIcon size="lg" icon={item.icon} />
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
          <span>{selectedItem.label}</span>
          <Button
            disabled={!value}
            onClick={() => {
              const protein = (
                Number(value) * selectedItem.proteinMultiplier
              )?.toFixed(1);
              const water =
                Number(value) * (selectedItem?.waterMultiplier || 0);
              fetcher.submit(
                {
                  protein,
                  water,
                },
                { method: "POST" }
              );
              toast(
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon size="2xl" icon={selectedItem.icon} />
                  {water
                    ? TEXTS["toast-water"].replace("{water}", water.toString())
                    : TEXTS["toast-protein"].replace("{protein}", protein)}
                </div>
              );
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
