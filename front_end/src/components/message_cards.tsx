import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;
interface MessageCardProps extends CardProps {
  message: string;
}

export function UserMessageCard({
  className,
  message,
  ...props
}: MessageCardProps) {
  return (
    <Card className={cn("w-[380px] bg-transparent ml-auto", className)} {...props}>
      <CardContent className="grid gap-4">
        <div>{message}</div>
      </CardContent>
    </Card>
  );
}

export function LlmMessageCard({
  className,
  message,
  ...props
}: MessageCardProps) {
  return (
    <Card className={cn("w-[380px] bg-gray-900 mr-auto", className)} {...props}>
      <CardContent className="grid gap-4">
        <div>{message}</div>
      </CardContent>
    </Card>
  );
}
