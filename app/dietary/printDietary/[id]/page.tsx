import { getDietarysById } from "@/lib/data";
import PrintDietary from "@/app/components/printDietary";
import { notFound } from "next/navigation";
const printDietaryPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const dietary = await getDietarysById(id);

  if (!dietary) {
    notFound();
  }
  return (
    <div>
      <PrintDietary dietary={dietary} />
    </div>
  );
};

export default printDietaryPage;
