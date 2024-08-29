import { SafeAreaView, Text } from "@/components/Themed";
import { Card } from "@/components/ui/Card";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMemo } from "react";
import * as schema from "../../db/schema";
import { db } from "../_layout";

export default function HomeScreen() {
  const { data } = useLiveQuery(db.select().from(schema.transactions));
  const balance = useMemo(() => {
    return data.reduce((acc, { amount }) => acc + amount, 0);
  }, [data]);

  return (
    <SafeAreaView className="p-4">
      <Card>
        <Text className="font-bold text-2xl">💰 Total balance</Text>
        <Text className="text-2xl">${balance}</Text>
      </Card>
    </SafeAreaView>
  );
}
