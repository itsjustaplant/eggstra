import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CirclePlus } from "lucide-react";
import { Button } from "~/components";
import { TEXTS } from "~/texts";
import { LogDialog } from "./log-dialog";

function Header() {
  return (
    <header className="w-screen font-bold bg-background sticky top-0 z-10 shrink-0 border-b">
      <div className="w-full max-w-7xl flex items-center m-auto gap-2 border-x-0 sm:border-x p-4 ">
        <FontAwesomeIcon icon="egg" size="lg" className="w-[25px] h-5" />
      <h1 className="geist-mono">{TEXTS.title}</h1>
      <LogDialog>
        <Button variant="outline">
          <CirclePlus fill="bg-background" stroke="var(--color-secondary)" />
          <span>{TEXTS.create}</span>
        </Button>
      </LogDialog>
      </div>
    </header>
  );
}

export { Header };
