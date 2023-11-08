import { Game } from "@/features/game";
import { GameProvider } from "@/components/game-provider";
import { Layout } from "@/components/layout";

const Play = () => {
  return (
    <GameProvider>
      <Layout className="flex-col gap-8 justify-center">
        <Game />
      </Layout>
    </GameProvider>
  );
};

export default Play;
