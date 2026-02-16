import { TCreateScratchCard, TScratchCard } from "@/types/scratch-cards/scratch-cards.type";
import { createData, readData, uploadFile } from "../apiService/crud";
import { Query } from "@/types/shared";

export async function getAllScratchCards(query?: Query) {
    const res = await readData(`/scratch-cards`, ["ScratchCards"], query);
    return res;
}

export async function createScratchCard(data: TCreateScratchCard) {
    const res = await createData<TCreateScratchCard>(`/scratch-cards`, '/dashboard/admin/scratch-cards', data);
    return res;
}

export async function bulkUploadCoupons(file: FormData) {
    console.log("file->>> ", file);
    const res = await uploadFile<FormData>(`/scratch-cards/bulk-import`, '/dashboard/admin/scratch-cards', file);
    console.log("res-> ", res);
    return res;
}