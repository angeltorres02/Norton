import clsx from "clsx";

interface MetricsProps {
  totalPoints: number;
}

function Metrics({ totalPoints }: MetricsProps) {
  return (
    <>
      <div id="wrapper" className="flex justify-center w-full">
        <div className="inline-grid justify-items-center border border-gray-700 p-2 ">
          <em className="font-bold text-xl">Calificacion</em>
          <p className="p-2 text-center">
            - El puntaje maximo es de 20 y un minimo de 5 puntos. <br />
            Marque cada una de las opciones de acuerdo
          </p>
        </div>
      </div>
      <div id="wrapper" className="flex justify-center w-full my-8">
        <div className="inline-grid">
          <em className="text-center border border-gray-700">Interpretacion</em>
          <p
            className={clsx(
              totalPoints > 5 && totalPoints <= 12 ? "bg-green-200" : ""
            )}
          >
            Riesgo alto: Puntuacion &le; 12
          </p>
          <p className={clsx(totalPoints >= 16 ? "bg-green-200" : "")}>
            Riesgo moderado: Puntuacion &ge; 16
          </p>
        </div>
      </div>
    </>
  );
}

export default Metrics;
