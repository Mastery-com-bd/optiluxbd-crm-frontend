import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const packageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPackage: builder.query({
            query: (params) => ({
                url: `/packages?${buildParams(params)}`,
                method: "GET",
            })
        })
    })
})
export const {
    useGetAllPackageQuery,
} = packageApi;