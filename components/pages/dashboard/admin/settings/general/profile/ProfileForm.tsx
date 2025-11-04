"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Input
} from "@/components/ui/input";
import {
    Button
} from "@/components/ui/button";
import {
    Label
} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


// Bangladesh divisons & cities mapping (can be externalized)
const divisions = [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Barisal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
] as const;

const citiesByDivision: Record<(typeof divisions)[number], string[]> = {
    Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail"],
    Chattogram: ["Chattogram", "Cox's Bazar", "Comilla", "Feni"],
    Rajshahi: ["Rajshahi", "Natore", "Naogaon", "Pabna"],
    Khulna: ["Khulna", "Jessore", "Bagerhat"],
    Barisal: ["Barisal", "Bhola", "Patuakhali"],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj"],
    Rangpur: ["Rangpur", "Dinajpur", "Thakurgaon"],
    Mymensingh: ["Mymensingh", "Netrokona", "Sherpur"],
};

// Zod validation schema
const profileSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(1, "User name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email"),
    address: z.string().optional(),
    country: z.string().min(1),
    state: z.string().min(1, "Division is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().optional(),
    image: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultValues: Partial<ProfileFormValues> = {
    country: "Bangladesh",
};

export function ProfileForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm < ProfileFormValues > ({
        resolver: zodResolver(profileSchema),
        defaultValues,
    });

    const [preview, setPreview] = useState < string | null > (null);

    const onSubmit = (data: ProfileFormValues) => {
        console.log("Submitted data: ", data);
        // to:do: .... send data to the backend.....
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <h3 className="text-lg font-semibold">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                        Provide the information below
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* === Image Upload === */}
                    <div>
                        <Label className="mb-1 block">Upload Image</Label>
                        <div className="flex items-center gap-4">
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={80}
                                    height={80}
                                    className="rounded-md"
                                />
                            ) : (
                                <div className="w-20 h-20 border border-dashed flex items-center justify-center rounded-md">
                                    <span className="text-sm text-muted-foreground">No Image</span>
                                </div>
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <small className="text-xs text-muted-foreground">
                            JPG, PNG. Max size 800KB.
                        </small>
                    </div>

                    {/* === Personal Info === */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label>First Name *</Label>
                            <Input {...register("firstName")} />
                            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <Label>Last Name *</Label>
                            <Input {...register("lastName")} />
                            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                        </div>
                        <div>
                            <Label>User Name *</Label>
                            <Input {...register("username")} />
                            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                        </div>
                    </div>

                    {/* === Contact === */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Phone Number *</Label>
                            <Input {...register("phoneNumber")} />
                            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
                        </div>
                        <div>
                            <Label>Email *</Label>
                            <Input type="email" {...register("email")} />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                    </div>

                    {/* === Address === */}
                    <div>
                        <Label>Address</Label>
                        <Input {...register("address")} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Country */}
                        <div>
                            <Label>Country</Label>
                            <Select defaultValue="Bangladesh" onValueChange={(value) => setValue("country", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* State / Division */}
                        <div>
                            <Label>State / Province</Label>
                            <Select
                                onValueChange={(value) => {
                                    setValue("state", value);
                                    setValue("city", ""); // reset city
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select division" />
                                </SelectTrigger>
                                <SelectContent>
                                    {divisions.map((division) => (
                                        <SelectItem key={division} value={division}>
                                            {division}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                        </div>

                        {/* City */}
                        <div>
                            <Label>City</Label>
                            <Select
                                onValueChange={(value) => setValue("city", value)}
                                disabled={!watch("state")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                    {watch("state") &&
                                        citiesByDivision[watch("state") as keyof typeof citiesByDivision]?.map((city) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                        </div>

                        {/* Postal */}
                        <div>
                            <Label>Postal Code</Label>
                            <Input {...register("postalCode")} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                    <Button variant="outline" type="button">
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-orange-600 text-white hover:bg-red-700">
                        Save Changes
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}