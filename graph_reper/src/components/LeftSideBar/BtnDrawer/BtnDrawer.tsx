import { Button, useDisclosure } from "@chakra-ui/react";
import { MutableRefObject, ReactElement } from "react";
import { AbstractDrawer } from "./AbstractDrawer";

interface Props {
  leftIcon: ReactElement;
  name: string;
  children: ReactElement;
  colorScheme?: string;
  header: string;
  initialFocusRef: MutableRefObject<null>;
  onSubmit: () => void;
}

function BtnDrawer({
  leftIcon,
  name,
  colorScheme,
  header,
  children,
  initialFocusRef,
  onSubmit,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button leftIcon={leftIcon} onClick={onOpen} colorScheme={colorScheme}>
        {name}
      </Button>
      <AbstractDrawer
        header={header}
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
        onSubmit={onSubmit}
        colorScheme={colorScheme}
      >
        {children}
      </AbstractDrawer>
    </>
  );
}

export default BtnDrawer;
