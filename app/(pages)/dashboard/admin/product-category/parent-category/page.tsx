'use client'

import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '@/redux/features/category/categoryApi';
import DeleteCategory from '@/components/pages/dashboard/admin/category/parent/DeleteCategory';
import UpdateCategory from '@/components/pages/dashboard/admin/category/parent/UpdateCategory';
import CategoryDetails from '@/components/pages/dashboard/admin/category/parent/DetailsModal';
import AddCategory from '@/components/pages/dashboard/admin/category/parent/AddCategory';

type Category = {
    id: number
    name: string
    slug: string
    description: string
    created_at: string
    updated_at: string
}

export default function ParentCategory() {
    const { data: categories, isLoading, isError, } = useGetAllCategoryQuery(undefined);
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()
    if (isLoading) return <div className="p-4">Loading...</div>
    if (isError) return <div className="p-4 text-red-500">Failed to load categories.</div>

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Manage Categories</h1>
                <AddCategory />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-24">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories?.map((category: Category, index: number) => (
                            <TableRow key={category.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.slug}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2 justify-center">
                                        <CategoryDetails {...category} />
                                        <UpdateCategory {...category} />
                                        <DeleteCategory func={deleteCategory} id={category.id} isLoading={isDeleting} />
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