import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import DragonSelection from "../DragonSelection/DragonSelection";
import { Monster } from "@/pages/api/monsters";

export default function BattleOfDragons() {
  const { data, error, isLoading } = useSWR<Array<Monster>>(
    "/api/monsters?type=dragon",
    fetcher
  );

  if (error) {
    return <div>Error :(</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
      <DragonSelection dragons={data} onStartFight={() => {}} />
  );
}
