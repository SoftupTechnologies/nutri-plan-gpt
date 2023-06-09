import {
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import useWindowSize from '@/lib/hooks/use-window-size';

import Leaflet from './leaflet';

interface Props {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}

const Popover: React.FC<Props> = ({
  children,
  content,
  align = "center",
  openPopover,
  setOpenPopover,
}) => {
  const { isMobile, isDesktop } = useWindowSize();
  return (
    <>
      {isMobile && children}
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>{content}</Leaflet>
      )}
      {isDesktop && (
        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger className="inline-flex" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={4}
            align={align}
            className="z-20 animate-slide-up-fade items-center rounded-md border border-gray-200 bg-white drop-shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  );
};

export default Popover;
