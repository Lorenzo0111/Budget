import { db } from "@/components/Database";
import { SafeAreaView, Text } from "@/components/Themed";
import { Card } from "@/components/ui/Card";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMemo } from "react";
import * as schema from "../../db/schema";
import { TouchableOpacity } from "react-native";
import { eq } from "drizzle-orm";

export default function HomeScreen() {
  const { data } = useLiveQuery(db.select().from(schema.transactions));
  const balance = useMemo(() => {
    return data.reduce((acc, { amount }) => acc + amount, 0);
  }, [data]);

  return (
    <SafeAreaView className="flex gap-3 p-4">
      <Card>
        <Text className="font-bold text-2xl">💰 Total balance</Text>
        <Text className="text-2xl">${balance}</Text>
      </Card>

      <Text className="font-bold text-2xl">Recent transactions</Text>
      {data.map((tx) => (
        <TouchableOpacity
          key={tx.id}
          onPress={async () => {
            await db
              .delete(schema.transactions)
              .where(eq(schema.transactions.id, tx.id));
          }}
        >
          <Card>
            <Text>
              {tx.amount > 0 ? "🟢" : "🔴"} {tx.amount} - {tx.name}
            </Text>
          </Card>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}
