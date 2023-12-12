import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface CalendarPopoverProps {
  children: React.ReactNode;
}

const CalendarPopover: React.FC<CalendarPopoverProps> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <Calendar />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarPopover;
