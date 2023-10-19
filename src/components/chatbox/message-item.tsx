import moment from "moment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function MessageItem({ message, createdAt }: { message: string, createdAt: string | Date }) {
  return (
    <Card >
      <CardHeader className="p-2 pb-1 items-end text-xs font-mono">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CardTitle className="text-xs font-bold" suppressHydrationWarning>
                {moment(createdAt).fromNow()}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent>
              {new Date(createdAt).toLocaleDateString()} - {new Date(createdAt).toLocaleTimeString()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="p-2">
        <CardDescription className="text-sm">{message}</CardDescription>
      </CardContent>
    </Card>
  )
}
