import { db } from "@/components/Database";
import { Button, SafeAreaView, Text, TextInput } from "@/components/Themed";
import { useState } from "react";
import * as schema from "../../db/schema";

export default function CreateScreen() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("0");

  return (
    <SafeAreaView className="flex gap-3 p-4">
      <Text className="font-bold text-2xl">Create a new transaction</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={(text) =>
          setAmount(text.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1"))
        }
      />

      <Button
        mode="contained"
        onPress={async () => {
          await db.insert(schema.transactions).values({
            name,
            amount: Number.parseFloat(amount),
          });
        }}
      >
        Create
      </Button>
    </SafeAreaView>
  );
}
