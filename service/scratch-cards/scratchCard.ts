import { TCreateScratchCard, TScratchCard } from "@/types/scratch-cards/scratch-cards.type";
import { createData, readData } from "../apiService/crud";
import { Query } from "@/types/shared";

export async function getAllScratchCards(query?: Query) {
    const res = await readData(`/scratch-cards`, ["ScratchCards"], query);
    return res;
}

export async function createScratchCard(data: TCreateScratchCard) {
    const res = await createData<TCreateScratchCard>(`/scratch-cards`, '/dashboard/admin/scratch-cards', data);
    return res;
}

export async function bulkUploadCoupons(file:File) {
    console.log(file);
    const res = await createData<File>(`/scratch-cards/bulk-import`, '/dashboard/admin/scratch-cards', file);
    console.log("res-> ", res);
    return res;
}