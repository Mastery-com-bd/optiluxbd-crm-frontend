import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { useDeleteCategoryMutation } from "@/redux/features/category/categoryApi"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    id: number
}

const DeleteCategory = ({ id }: Props) => {
    const [deleteCategory, { isLoading }] = useDeleteCategoryMutation()
    const [open, setOpen] = useState(false)

    async function onDelete() {
        try {
            toast.promise(deleteCategory(id).unwrap(), {
                loading: "Deleting category...",
                success: "Category deleted successfully!",
                error: "Failed to delete category.",
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Delete failed:", error)
            toast.error("Failed to delete category.")
        } finally {
            setOpen(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen(true)
                    }}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this category from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} disabled={isLoading}>
                        {isLoading ? "Deleting..." : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCategory