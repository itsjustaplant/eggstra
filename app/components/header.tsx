import { CirclePlus, EggIcon } from "lucide-react";
import { TEXTS } from "~/texts";
import { Button } from "./ui/button";

function Header() {
	return (
		<header className="p-4 bg-background sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b">
			<EggIcon />
			<h1>{TEXTS.title}</h1>
			<Button className="ml-auto h-7 cursor-pointer">
				<CirclePlus fill="bg-background" stroke="var(--color-secondary)" />
				<span>{TEXTS.create}</span>
			</Button>
		</header>
	);
}

export { Header };
