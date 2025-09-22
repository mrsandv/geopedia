import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

type TMessage = {
  title: string;
  description?: string;
};

const Message = ({ title, description }: TMessage) => {
  return (
    <Surface style={styles.container}>
      <Text style={styles.title} variant="headlineLarge">
        {title}
      </Text>
      <Text variant="bodyMedium">{description}</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { marginVertical: 10 },
});

export default Message;
