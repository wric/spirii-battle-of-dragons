import { Button, HStack, VStack, useStatStyles } from "@chakra-ui/react";
import DragonSelect from "../DragonSelect/DragonSelect";
import { Monster } from "@/pages/api/monsters";
import { useState } from "react";
import DragonCard from "../DragonCard/DragonCard";

export default function DragonSelection({
  dragons,
  onStartFight,
}: {
  dragons: Array<Monster>;
  onStartFight: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const [idDragon1, setIdDragon1] = useState<string | null>(null);
  const [idDragon2, setIdDragon2] = useState<string | null>(null);

  const dragon1 = dragons.find((dragon) => dragon.id === Number(idDragon1));
  const dragon2 = dragons.find((dragon) => dragon.id === Number(idDragon2));

  return (
    <HStack gap="2rem" mt="4rem" pb="1rem" align={"start"}>
      <VStack>
        <DragonSelect
          dragons={dragons}
          onChange={(e) => setIdDragon1(e.target.value)}
        ></DragonSelect>
        {dragon1 && <DragonCard dragon={dragon1} />}
      </VStack>
      <VStack>
        <Button
          colorScheme="teal"
          onClick={onStartFight}
          isDisabled={!dragon1 || !dragon2}
        >
          Fight!
        </Button>
      </VStack>
      <VStack>
        <DragonSelect
          dragons={dragons}
          onChange={(e) => setIdDragon2(e.target.value)}
        ></DragonSelect>
        {dragon2 && <DragonCard dragon={dragon2} />}
      </VStack>
    </HStack>
  );
}
