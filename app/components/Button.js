import { title } from "process";
import { Pressable, Text } from "react-native";

export const Button = ({ tile, ...restProps }) => {
  return (
    <Pressable {...restProps}>
      <Text style={styles.btntext}>{title}</Text>
    </Pressable>
  );
};
