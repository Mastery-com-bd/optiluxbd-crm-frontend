'use client'

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { useAddSubCategoryMutation, useDeleteSubCategoryMutation, useGetSubcategoryQuery, useUpdateSubCategoryMutation } from "@/redux/features/category/categoryApi"
import AddSubcategory from "@/components/pages/dashboard/admin/category/child/AddSubCategory"
import DeleteCategory from "@/components/pages/dashboard/admin/category/parent/DeleteCategory"


type SubCategoryItem = {
    id: number
    name: string
    slug: string
    description: string
    categoryId: number
    created_at: string
    updated_at: string
    category: {
        id: number
        name: string
    }
}

const SubCategory = () => {
    const [addSubcategory] = useAddSubCategoryMutation();
    const [updateSubcategory] = useUpdateSubCategoryMutation();
    const { data: subcategories, isLoading, isError } = useGetSubcategoryQuery(undefined);
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteSubCategoryMutation();

    if (isLoading) return <p className="p-4">Loading subcategories...</p>
    if (isError) return <p className="p-4 text-red-500">Failed to load subcategories.</p>
    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Subcategories</h2>
                <AddSubcategory func={addSubcategory} opt="create" />
            </div>

            <div className="rounded-md border ">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Parent Category</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {subcategories?.map((sub: SubCategoryItem, index: number) => (
                            <TableRow key={sub.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{sub.name}</TableCell>
                                <TableCell>{sub.slug}</TableCell>
                                <TableCell>{sub.description}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    {sub.category?.name}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        {/* <SubCategoryDetails subcategory={sub} /> */}
                                        <AddSubcategory func={updateSubcategory} opt="update" subCategory={sub} />
                                        <DeleteCategory id={sub.id} func={deleteCategory} isLoading={isDeleting} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default SubCategory