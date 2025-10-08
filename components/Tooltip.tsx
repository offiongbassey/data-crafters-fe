import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
    children: React.ReactNode;
    message: string;
}

const ToolTip = ({ children, message }: Props) => {
    return (
        <Tooltip>
        <TooltipTrigger asChild>
          <button>{children}</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    )
}

export default ToolTip;