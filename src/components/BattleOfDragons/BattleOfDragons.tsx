import fetcher from "@/lib/fetcher";
import { Monster } from "@/pages/api/monsters";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import DragonCard from "../DragonCard/DragonCard";
import DragonSelect from "../DragonSelect/DragonSelect";

export default function BattleOfDragons() {
  const { data, error, isLoading } = useSWR<Array<Monster>>(
    "/api/monsters?type=dragon",
    fetcher
  );

  const [dragon1, setDragon1] = useState<Monster | undefined>(undefined);
  const [dragon2, setDragon2] = useState<Monster | undefined>(undefined);

  const dragons = data || [];

  const setDragon = (event: ChangeEvent<HTMLSelectElement>) =>
    dragons.find((dragon) => dragon.id === Number(event.target.value));

  if (error) {
    return (
      <VStack>
        <Text>An unexpected error happened. Try to reload the page.</Text>
      </VStack>
    );
  }

  return (
    <HStack gap="2rem" mt="4rem" pb="1rem" align={"start"}>
      <VStack>
        <DragonSelect
          dragons={dragons}
          onChange={(e) => setDragon1(setDragon(e))}
        ></DragonSelect>
        {dragon1 && <DragonCard dragon={dragon1} />}
      </VStack>
      <VStack>
        <Button
          colorScheme="teal"
          // onClick={}
          isDisabled={!dragon1 || !dragon2}
          isLoading={isLoading}
        >
          Fight!
        </Button>
      </VStack>
      <VStack>
        <DragonSelect
          dragons={dragons}
          onChange={(e) => setDragon2(setDragon(e))}
        ></DragonSelect>
        {dragon2 && <DragonCard dragon={dragon2} />}
      </VStack>
    </HStack>
  );
}
