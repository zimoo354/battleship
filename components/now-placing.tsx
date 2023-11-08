type NowPlacingProps = {
  available: number[];
};

export const NowPlacing = ({ available }: NowPlacingProps) => {
  const [next, ...rest] = available.slice(0);
  return (
    <p>
      Now placing: {next} | Next: {rest.join(", ")}
    </p>
  );
};
