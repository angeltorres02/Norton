interface ResultsProps {
  totalPoints: number;
}

function Results({ totalPoints }: ResultsProps) {
  return (
    <div className="flex justify-center">
      <em className="p-[1.5%] bg-blue-100 relative my-8 border border-solid border-black text-xl left-[19.7%]">
        Resultados:
        <span> {totalPoints}</span>
      </em>
    </div>
  );
}

export default Results;
