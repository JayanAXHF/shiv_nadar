import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { db } from "~/server/db";

export default async function HomePage() {
  const messages = await db.query.messages.findMany();
  return (
		<div className="w-full flex justify-center">
			<ScrollArea className="h-dvh md:w-[60vw] flex bg-black pt-10">
				{messages.map((message) => (
					<div key={message.id} className="justify-end w-full text-center">{message.text}</div>
				))}
				<Button className="">Send</Button>
			</ScrollArea>
		</div>
  );
}
