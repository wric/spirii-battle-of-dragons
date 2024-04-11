import { Fight, FightResult, FightWinner } from "@/pages/api/fight/types";
import { Button, Code, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import DragonCard from "../DragonCard/DragonCard";
import DragonSelect from "../DragonSelect/DragonSelect";
import { fetcher } from "./lib";
import { MonsterWithHealth } from "@/pages/api/monsters/types";

export default function BattleOfDragons() {
  const { data, error, isLoading } = useSWR<Array<MonsterWithHealth>>(
    "/api/monsters?type=dragon",
    fetcher
  );

  const [isFighLoading, setIsFightLoading] = useState(false);
  const [fightError, setFightError] = useState("");
  const [winner, setWinner] = useState<FightWinner>(null);
  const [dragon1, setDragon1] = useState<MonsterWithHealth | undefined>(
    undefined
  );
  const [dragon2, setDragon2] = useState<MonsterWithHealth | undefined>(
    undefined
  );

  const dragons = data || [];

  const setDragon = (event: ChangeEvent<HTMLSelectElement>) => {
    const dragon = dragons.find(
      (dragon) => dragon.id === Number(event.target.value)
    );

    if (dragon) {
      dragon.health = 100;
    }

    return dragon;
  };

  const doFight = async () => {
    if (!dragon1 || !dragon2) {
      return;
    }

    setFightError("");
    setIsFightLoading(true);

    try {
      const payload: Fight = { dragon1, dragon2 };
      const res = await fetch("/api/fight", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (res.status >= 400) {
        setFightError(res.statusText);
      } else {
        const fightResult: FightResult = await res.json();
        setDragon1(fightResult.dragon1);
        setDragon2(fightResult.dragon2);
        if (fightResult.winner !== null) {
          setWinner(fightResult.winner);
        }
      }
    } catch (err: any) {
      setFightError(err.toString());
    } finally {
      setIsFightLoading(false);
    }
  };

  const createWinnerTitel = () => {
    if (winner === "dragon1") {
      return `${dragon1?.name} won!`;
    } else if (winner === "dragon2") {
      return `${dragon2?.name} won!`;
    } else if (winner === "none") {
      return "It's a tie!";
    }
  };

  const resetGame = () => {
    setDragon1(undefined);
    setDragon2(undefined);
    setWinner(null);
    setFightError("");
    setIsFightLoading(false);
  };

  return (
    <VStack padding="1rem">
      <HStack gap="2rem" mt="4rem" pb="2rem" align={"start"}>
        <VStack>
          <DragonSelect
            dragons={dragons}
            onChange={(e) => setDragon1(setDragon(e))}
            isDisabled={winner !== null}
          ></DragonSelect>
          {dragon1 && <DragonCard dragon={dragon1} />}
        </VStack>
        <VStack>
          <Button
            colorScheme="teal"
            onClick={doFight}
            isDisabled={!dragon1 || !dragon2 || winner !== null}
            isLoading={isLoading || isFighLoading}
          >
            Fight!
          </Button>
        </VStack>
        <VStack>
          <DragonSelect
            dragons={dragons}
            onChange={(e) => setDragon2(setDragon(e))}
            isDisabled={winner !== null}
          ></DragonSelect>
          {dragon2 && <DragonCard dragon={dragon2} />}
        </VStack>
      </HStack>

      {winner !== null && (
        <VStack pb="2rem">
          <Heading as="h3" size="xl">
            {createWinnerTitel()}
          </Heading>
          <Button colorScheme="teal" onClick={resetGame} mt="2rem">
            New game
          </Button>
        </VStack>
      )}

      {(error || fightError) && (
        <VStack>
          <Text>An unexpected error happened. Try to reload the page.</Text>
          {error && <Code>{error}</Code>}
          {fightError && <Code>{fightError}</Code>}
        </VStack>
      )}
    </VStack>
  );
}
