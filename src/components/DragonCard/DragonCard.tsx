import { MonsterWithHealth } from "@/pages/api/monsters/types";
import {
  Card,
  CardBody,
  Divider,
  Heading,
  Text
} from "@chakra-ui/react";

export default function DragonCard({ dragon }: { dragon: MonsterWithHealth }) {
  return (
    <Card width="100%">
      <CardBody>
        <Heading as="h5" size="xs">
          Name
        </Heading>
        <Text>{dragon.name}</Text>
        <Divider />
        <Heading as="h5" size="xs" mt="1rem">
          Strength
        </Heading>
        <Text>{dragon.strength}</Text>
        <Divider />
        <Heading as="h5" size="xs" mt="1rem">
          Health
        </Heading>
        <Text>{dragon.health}</Text>
        <Divider />
        <Heading as="h5" size="xs" mt="1rem">
          Size
        </Heading>
        <Text>{dragon.size}</Text>
        <Divider />
        <Heading as="h5" size="xs" mt="1rem">
          Type
        </Heading>
        <Text>{dragon.type}</Text>
      </CardBody>
    </Card>
  );
}
