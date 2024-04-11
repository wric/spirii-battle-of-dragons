import { MonsterWithHealth } from "@/pages/api/monsters";
import { Select } from "@chakra-ui/react";

export default function DragonSelect({
  dragons,
  onChange,
}: {
  dragons: Array<MonsterWithHealth>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <Select placeholder="Select dragon" onChange={onChange}>
      {dragons.map((dragon) => (
        <option key={`dragon-${dragon.id}`} value={dragon.id}>
          {dragon.name}
        </option>
      ))}
    </Select>
  );
}
