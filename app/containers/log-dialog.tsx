import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";
import {
	Button,
	Dialog,
	DialogClose,
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
					<DialogClose className="ml-auto" asChild>
						<Button
							disabled={!value}
							onClick={() => {
								const type = selectedItem.key;
								const amount = Number(value);
								const protein = type === "protein" ? amount : 0;
								const water = type === "water" ? amount : 0;
								const carbs = type === "carbs" ? amount : 0;
								const toastText = (
									TEXTS[`toast-${type}` as keyof typeof TEXTS] as string
								).replace(`{${type}}`, value);
								fetcher.submit(
									{
										protein,
										water,
										carbs,
									},
									{ method: "POST" },
								);
								toast(
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon size="2xl" icon={selectedItem.icon} />
										{toastText}
									</div>,
								);
							}}
							className="cursor-pointer disabled:cursor-not-allowed"
						>
							{TEXTS["dialog-action"]}
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export { LogDialog };
