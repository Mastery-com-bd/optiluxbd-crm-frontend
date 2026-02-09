/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { createData, readData } from "../apiService/crud";

export type TOnBoardingStep = {
  step: string;
  data: {
    name: string;
    phone: string;
    website: string;
    dateFormat: string;
    timezone: string;
    currency: string;
    logo_url: string;
  };
};

export async function getOnBoardingStatus() {
  const res = await readData("/onboarding", ["Onboarding"]);
  return res;
}

export const completeOnboarding = async () => {
  try {
    const result = await createData<any>(
      `/onboarding/complete`,
      "/dashboard/onboarding",
    );
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateOnboardingStep = async (data: TOnBoardingStep) => {
  try {
    const result = await createData<any>(
      `/onboarding/step`,
      "/dashboard/onboarding",
      data,
    );
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
