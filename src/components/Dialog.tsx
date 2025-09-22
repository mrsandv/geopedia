import { Portal, Dialog, Button, Text } from "react-native-paper";

type TDialog = {
  title: string;
  description: string;
  visible: boolean;
  onClose: () => void;
  onAccept: () => void;
};

const CustomDialog = ({
  title,
  description,
  visible,
  onClose,
  onAccept,
}: TDialog) => {
  const handleAccept = () => {
    onAccept();
    onClose();
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{description}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleAccept}>Sí, eliminar</Button>
          <Button onPress={onClose}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
