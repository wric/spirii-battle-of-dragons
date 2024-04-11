import { MonsterWithHealth } from "@/pages/api/monsters/types";
import { Select } from "@chakra-ui/react";

export default function DragonSelect({
  dragons,
  onChange,
  isDisabled,
}: {
  dragons: Array<MonsterWithHealth>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled: boolean;
}) {
  return (
    <Select
      placeholder="Select dragon"
      onChange={onChange}
      isDisabled={isDisabled}
    >
      {dragons.map((dragon) => (
        <option key={`dragon-${dragon.id}`} value={dragon.id}>
          {dragon.name}
        </option>
      ))}
    </Select>
  );
}
