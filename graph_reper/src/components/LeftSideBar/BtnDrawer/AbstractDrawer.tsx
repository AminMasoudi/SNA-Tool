import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { MutableRefObject, ReactElement } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
  colorScheme?: string;
  header: string;
  initialFocusRef: MutableRefObject<null>;
  onSubmit: () => void;
}

export const AbstractDrawer = ({
  isOpen,
  onClose,
  colorScheme,
  header,
  children,
  initialFocusRef,
  onSubmit,
}: Props) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={initialFocusRef}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{header}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme={colorScheme}
            bg={colorScheme}
            color={"#fff"}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
