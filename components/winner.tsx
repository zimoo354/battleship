import { useGame } from "./game-provider";

export const Winner = () => {
  const { winner } = useGame();

  return (
    <div className="fixed h-screen w-screen top-0 left-0 bg-white/20 backdrop-blur-md flex justify-center items-center z-[5]">
      <h1 className="text-6xl -rotate-12">🎉 {winner} has won! 🎉</h1>
    </div>
  );
};
