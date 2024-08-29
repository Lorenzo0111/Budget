import { useTheme } from "@/components/Theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pie-chart" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Dashboard",
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
