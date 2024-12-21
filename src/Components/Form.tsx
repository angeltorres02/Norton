import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import rawData from "../../data/preguntas.json";
import { useEffect, useMemo, useState } from "react";
import { ChangeEvent } from "react";

interface FormProps {
  setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
}

type Option = {
  valor: string;
  opcion: string;
};

type Question = {
  id: number;
  question: string;
  options: Option[];
  points: number;
};

const baseData: Question[] = rawData.map((item) => ({
  id: Number(item.id),
  question: item.pregunta,
  options: item.opciones,
  points: 0,
}));

function Form({ setTotalPoints }: FormProps) {
  const [questionPoints, setQuestionPoints] = useState<{
    [key: number]: number;
  }>({});

  const columnHelper = createColumnHelper<Question>();

  const data = useMemo(() => {
    return baseData.map((item) => ({
      ...item,
      points: questionPoints[item.id] || 0,
    }));
  }, [questionPoints]);

  const columns = [
    columnHelper.accessor("question", {
      header: () => "Criterio",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("options", {
      header: () => "Evaluado",
      cell: (info) => (
        <div>
          {info.row.original.options.map((option: Option) => (
            <label key={option.valor} className="flex gap-4">
              <input
                type="radio"
                name={`question-${info.row.original.id}`}
                value={option.valor}
                checked={
                  questionPoints[info.row.original.id] === Number(option.valor)
                }
                onChange={(e) => handleSelectOption(e, info.row.original)}
              />
              {option.opcion}
            </label>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor("points", {
      header: () => "Puntos",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleSelectOption(e: ChangeEvent<HTMLInputElement>, row: Question) {
    const value = Number(e.target.value);
    setQuestionPoints((prev) => ({
      ...prev,
      [row.id]: value,
    }));
  }

  useEffect(() => {
    const total = data.reduce((acc, item) => acc + item.points, 0);
    setTotalPoints(total);
  }, [data, setTotalPoints]);

  return (
    <div className="flex justify-center items-center">
      <table className="w-[50%]">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border px-1 border-solid border-black p-4 text-center bg-gray-800 text-gray-200"
                >
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-blue-100 even:bg-blue-200">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border px-1 border-solid border-black text-center p-4"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Form;
