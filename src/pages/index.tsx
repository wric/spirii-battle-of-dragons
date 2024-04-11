import BattleOfDragons from "@/components/BattleOfDragons/BattleOfDragons";
import { Heading, VStack } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Battle of Dragons</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <VStack>
          <Heading as="h1" size="3xl" noOfLines={1} mt="4rem" pb="1rem">
            Battle of Dragons
          </Heading>
          <BattleOfDragons />
        </VStack>
      </main>
    </>
  );
}
