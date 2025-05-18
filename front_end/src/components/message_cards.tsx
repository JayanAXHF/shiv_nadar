import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

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
        className={cn("w-[380px] bg-transparent ml-auto", className)}
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
  return (
    <>
      <Card
        className={cn("w-[380px] bg-gray-900 mr-auto", className)}
        {...props}
      >
        <CardContent className="grid gap-4">
          <div>{message}</div>
        </CardContent>
      </Card>
      <small className="text-gray-400 text-xs">
        {" "}
        {new Date().getDay == timestamp.getDay
          ? timestamp.toLocaleTimeString()
          : timestamp.toLocaleString()}
      </small>
    </>
  );
}
