import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Props = {
    id: number
    name: string
    slug: string
    description: string
    created_at: string
    updated_at: string
}

const CategoryDetails = ({ id, name, slug, description, created_at, updated_at }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Category Details</DialogTitle>
                    <DialogDescription>
                        Full information of the selected category.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="space-y-1">
                        <Label>Name</Label>
                        <p className="rounded bg-muted px-3 py-2 text-sm">{name}</p>
                    </div>

                    <div className="space-y-1">
                        <Label>Slug</Label>
                        <p className="rounded bg-muted px-3 py-2 text-sm">{slug}</p>
                    </div>

                    <div className="space-y-1">
                        <Label>Description</Label>
                        <p className="rounded bg-muted px-3 py-2 text-sm">{description}</p>
                    </div>

                    <div className="space-y-1">
                        <Label>Created At</Label>
                        <p className="rounded bg-muted px-3 py-2 text-sm text-muted-foreground">
                            {new Date(created_at).toLocaleString()}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <Label>Updated At</Label>
                        <p className="rounded bg-muted px-3 py-2 text-sm text-muted-foreground">
                            {new Date(updated_at).toLocaleString()}
                        </p>
                    </div>

                    <div className="pt-2 text-right">
                        <DialogTrigger asChild>
                            <Button variant="ghost">Close</Button>
                        </DialogTrigger>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryDetails