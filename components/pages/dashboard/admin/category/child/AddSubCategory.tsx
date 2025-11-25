/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useMemo, useEffect } from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Pencil, Plus } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
    useGetAllCategoryQuery,
} from "@/redux/features/category/categoryApi"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    description: z.string().min(1, "Description is required"),
    categoryId: z.number({ error: "Parent category is required" }),
})

type CategoryFormValues = z.infer<typeof categorySchema>

type TSub = {
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

type Props = {
    func: (values: any) => Promise<any>,
    opt: "create" | "update",
    subCategory?: TSub
}

const AddSubcategory = ({ func, opt, subCategory }: Props) => {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [popoverOpen, setPopoverOpen] = useState(false)

    const isUpdate = opt === "update"
    const { data: parentCategory = [] } = useGetAllCategoryQuery(undefined)

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
            categoryId: 0,
        },
    })

    useEffect(() => {
        if (isUpdate && subCategory) {
            form.reset({
                name: subCategory.name,
                description: subCategory.description,
                categoryId: subCategory.categoryId,
            })
        } else {
            form.reset({
                name: "",
                description: "",
                categoryId: 0,
            })
        }
    }, [isUpdate, subCategory, form, open])

    const onSubmit = async (values: CategoryFormValues) => {
        const isUpdating = opt === "update";

        const payload = isUpdating && subCategory
            ? { id: subCategory.id, data: values }
            : values;
        console.log({...payload});
        toast.promise(
            func({ ...payload })
                .then(() => {
                    setOpen(false)
                    form.reset()
                }),
            {
                loading: `${isUpdating ? "Updating" : "Creating"} subcategory...`,
                success: `Subcategory ${isUpdating ? "updated" : "created"} successfully!`,
                error: `Failed to ${isUpdating ? "update" : "create"} subcategory.`,
            }
        )
    }

    const filteredCategories = useMemo(() => {
        return parentCategory.filter((cat: { id: number, name: string }) =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, parentCategory])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isUpdate ? (
                    <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button>
                        <Plus className="mr-2 w-4 h-4" />
                        Add Subcategory
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {isUpdate ? "Update Subcategory" : "Add Subcategory"}
                    </DialogTitle>
                    <DialogDescription>
                        {isUpdate
                            ? "Edit the subcategory information below."
                            : "Provide a subcategory name and description."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Subcategory name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Write a short description..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Parent Category (searchable dropdown) */}
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parent Category</FormLabel>
                                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn("w-full justify-between")}
                                                >
                                                    {
                                                        parentCategory.find((cat: { id: number }) => cat.id === field.value)?.name ||
                                                        "Select category"
                                                    }
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-2">
                                            <Input
                                                placeholder="Search category..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="mb-2"
                                            />
                                            <div className="max-h-48 overflow-y-auto space-y-1">
                                                {filteredCategories.length > 0 ? (
                                                    filteredCategories.map((cat: { id: number, name: string }) => (
                                                        <Button
                                                            type="button"
                                                            key={cat.id}
                                                            variant={cat.id === field.value ? "secondary" : "ghost"}
                                                            className="w-full justify-start"
                                                            onClick={() => {
                                                                field.onChange(cat.id)
                                                                setPopoverOpen(false)
                                                                setSearchTerm("")
                                                            }}
                                                        >
                                                            {cat.name}
                                                        </Button>
                                                    ))
                                                ) : (
                                                    <div className="text-muted-foreground px-2 py-1 text-sm">
                                                        No categories found.
                                                    </div>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Action Buttons */}
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                {isUpdate ? "Update" : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddSubcategory