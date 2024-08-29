import { View } from "react-native";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={`rounded-lg bg-card p-4 ${className || ""}`}>
      {children}
    </View>
  );
}
