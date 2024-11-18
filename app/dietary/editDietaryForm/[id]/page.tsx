import { getDietarysById } from "@/lib/data";
import UpdateDietaryForm from "@/app/components/editForm";
import { notFound } from "next/navigation";
const editDietaryPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const dietary = await getDietarysById(id);

  if (!dietary) {
    notFound();
  }

  return (
    <div>
      <UpdateDietaryForm dietary={dietary} />
    </div>
  );
};

export default editDietaryPage;
