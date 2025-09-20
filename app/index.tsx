import { useRouter } from "expo-router";
import { View, Button } from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View>
      <Button
        title="Explorar Continentes"
        onPress={() => router.push("/continents/")}
      />
      <Button
        title="Explorar Paises"
        onPress={() => router.push("/countries/")}
      />
    </View>
  );
};

export default HomeScreen;
