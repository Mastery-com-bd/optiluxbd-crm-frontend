"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import Image from "next/image";

// Schema for form validation
const schema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone number is required"),
    fax: z.string().optional(),
    website: z.string().url().optional(),
    address: z.string().optional(),
    country: z.string(),
    state: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    images: z
        .array(z.any())
        .length(4, "Exactly 4 images required")
        .optional(),
});

type FormData = z.infer<typeof schema>;

export default function CompanySettingsForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            country: "Bangladesh",
        },
    });

    const [previews, setPreviews] = useState<(string | null)[]>([null, null, null, null]);

    // Handle image preview and file store in form state
    const handleLogoChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create base64 preview
        const reader = new FileReader();
        reader.onload = () => {
            const newPreviews = [...previews];
            newPreviews[index] = reader.result as string;
            setPreviews(newPreviews);

            // store image file in form
            const currentImages = watch("images") || [];
            const updatedImages = [...currentImages];
            updatedImages[index] = file;
            setValue("images", updatedImages);
        };
        reader.readAsDataURL(file);
    };

    //  On form submit
    const onSubmit = (data: FormData) => {
        console.log("Form Submitted ✅:", data);
        console.log("Uploaded Images 🖼️:", data.images);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Company Settings</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* === Company Info === */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Company Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <Label>Company Name*</Label>
                                <Input {...register("companyName")} />
                                {errors.companyName && (
                                    <p className="text-sm text-red-500">{errors.companyName.message}</p>
                                )}
                            </div>

                            <div>
                                <Label>Email*</Label>
                                <Input {...register("email")} />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <Label>Phone*</Label>
                                <Input {...register("phone")} />
                                {errors.phone && (
                                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                                )}
                            </div>

                            <div>
                                <Label>Fax</Label>
                                <Input {...register("fax")} />
                            </div>

                            <div className="col-span-2">
                                <Label>Website</Label>
                                <Input {...register("website")} />
                            </div>
                        </div>
                    </div>

                    {/* === Company Images === */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Company Images</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="border p-4 rounded flex flex-col items-center">
                                    <div className="w-24 h-24 flex items-center justify-center border border-dashed rounded mb-2">
                                        {previews[i] ? (
                                            <Image
                                                src={previews[i] as string}
                                                alt={`Logo ${i}`}
                                                width={80}
                                                height={80}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-400">No Logo</span>
                                        )}
                                    </div>
                                    <Input
                                        type="file"
                                        onChange={(e) => handleLogoChange(e, i)}
                                        accept="image/*"
                                    />
                                    <p className="text-xs mt-1 text-center text-muted-foreground">
                                        Recommended size 250×100px
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* === Address === */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Address</h3>
                        <Label>Address</Label>
                        <Input {...register("address")} />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <Label>Country</Label>
                                <Select
                                    defaultValue="Bangladesh"
                                    onValueChange={(val) => setValue("country", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                        <SelectItem value="United States">United States</SelectItem>
                                        <SelectItem value="Canada">Canada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>State / Province</Label>
                                <Input {...register("state")} />
                            </div>

                            <div>
                                <Label>City</Label>
                                <Input {...register("city")} />
                            </div>

                            <div>
                                <Label>Zip Code</Label>
                                <Input {...register("zipCode")} />
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline" type="button">
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-red-600 text-white hover:bg-red-700">
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}