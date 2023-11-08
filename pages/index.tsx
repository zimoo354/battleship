import { Button } from "@/components/button";
import { Instructions } from "@/components/instructions";
import { Layout } from "@/components/layout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const goToGame = () => {
    router.push("/play");
  };

  return (
    <Layout className="flex-col gap-8 justify-center items-center">
      <Instructions />
      <Button onClick={goToGame}>Play! 🛳️</Button>
    </Layout>
  );
}
