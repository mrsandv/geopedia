import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { TCountry } from "types";

type TListItem = {
  type?: "continent" | "country";
  item: TCountry;
  action?: ReactNode;
};

const ListItem = ({ item, action, type = "country" }: TListItem) => {
  const { dark } = useTheme();
  const router = useRouter();

  return (
    <Card
      style={styles.card}
      mode={dark ? "contained" : "elevated"}
      onPress={() => {
        if (type === "continent") {
          router.push(`/continents/${item.code}`);
          return;
        }
        router.push(`/countries/${item.code}`);
      }}
    >
      <Card.Content>
        <View style={styles.content}>
          <View>
            <Text variant="titleLarge">{`${item.emoji} ${item.name}`}</Text>
            <Text variant="bodyMedium">{item.code}</Text>
          </View>
          {action && action}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
    borderRadius: 12,
  },
  content: { flexDirection: "row", justifyContent: "space-between" },
});

export default ListItem;
