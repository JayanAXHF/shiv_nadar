import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "./navbar";

type CardProps = React.ComponentProps<typeof Card>;
interface MessageCardProps extends CardProps {
  message: string;
  timestamp: Date;
}

export function UserMessageCard({
  className,
  message,
  timestamp,
  ...props
}: MessageCardProps) {
  return (
    <div className="flex items-center gap-4 flex-col">
      <Card
        className={cn("w-[380px] bg-transparent md:ml-auto", className)}
        {...props}
      >
        <CardContent className="grid gap-4">
          <div>{message}</div>
        </CardContent>
      </Card>
      <span className="text-right text-gray-400 text-xs ml-auto">
        {new Date().getDay == timestamp.getDay
          ? timestamp.toLocaleTimeString()
          : timestamp.toLocaleString()}
      </span>
    </div>
  );
}

export function LlmMessageCard({
  className,
  message,
  timestamp,
  ...props
}: MessageCardProps) {
  if (!message) {
    return <div className="text-red-500">Error: no response generated.</div>;
  }
  return (
    <div className="flex items-start gap-4 flex-col">
      <div
        className={cn(
          "border border-black/[0.2] dark:border-white/[0.2]  max-w-sm md:ml-5 p-4 relative mb-2 mr-auto flex flex-col gap-6",
          className,
        )}
        {...props}
      >
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
        <div className="grid gap-4">
          <div>{message}</div>
        </div>
      </div>
      <small className="text-gray-400 text-xs">
        {" "}
        {new Date().getDay == timestamp.getDay
          ? timestamp.toLocaleTimeString()
          : timestamp.toLocaleString()}
      </small>
    </div>
  );
}
