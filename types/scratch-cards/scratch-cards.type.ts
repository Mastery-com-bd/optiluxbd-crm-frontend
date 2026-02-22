type CardStatus = "ACTIVE" | "INACTIVE" | "EXPIRED" | "USED";

export interface TScratchCard {
    id: number;
    organizationId: number;
    code: string;
    amount: string;
    status: CardStatus;
    expiryDate: string;
    batchId: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TCreateScratchCard {
    amount: number;
    count: number;
    expiryDate: string;
    batchId: string;
    isPublic: boolean;
}

export type TScratchCardsList = TScratchCard[];