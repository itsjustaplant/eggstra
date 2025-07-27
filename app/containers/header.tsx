import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CirclePlus } from "lucide-react";
import { buttonVariants } from "~/components";
import { cn } from "~/lib/utils";
import { TEXTS } from "~/texts";
import { LogDialog } from "./log-dialog";

function Header() {
  return (
    <header className="font-bold p-4 bg-background sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b">
      <FontAwesomeIcon icon="egg" size="lg" className="w-[25px] h-5" />
      <h1 className="geist-mono">{TEXTS.title}</h1>
      <LogDialog>
        <div className={cn(buttonVariants({ variant: "outline" }))}>
          <CirclePlus fill="bg-background" stroke="var(--color-secondary)" />
          <span>{TEXTS.create}</span>
        </div>
      </LogDialog>
    </header>
  );
}

export { Header };
