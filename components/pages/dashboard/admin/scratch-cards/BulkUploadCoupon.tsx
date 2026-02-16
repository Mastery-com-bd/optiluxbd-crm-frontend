/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { bulkUploadCoupons } from "@/service/scratch-cards/scratchCard";
import { Upload, FileUp, X } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

export default function BulkUploadCoupon() {
    const [open, setOpen] = useState(false);
    const [fileData, setFileData] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateCSV = async (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const text = e.target?.result as string;
                const lines = text.split("\n").filter(line => line.trim());

                if (lines.length < 2) {
                    toast.error("CSV file is empty or has no data rows");
                    resolve(false);
                    return;
                }

                // Check header
                const header = lines[0].toLowerCase().split(",").map(h => h.trim());
                const requiredFields = ["code", "amount", "expirydate", "batchid"];

                const hasAllFields = requiredFields.every(field =>
                    header.includes(field)
                );

                if (!hasAllFields) {
                    toast.error(`CSV must contain these fields: ${requiredFields.join(", ")}`);
                    resolve(false);
                    return;
                }

                // Check if data rows exist
                if (lines.length < 2) {
                    toast.error("CSV has no data rows");
                    resolve(false);
                    return;
                }

                toast.success("CSV validation passed");
                resolve(true);
            };

            reader.onerror = () => {
                toast.error("Failed to read CSV file");
                resolve(false);
            };

            reader.readAsText(file);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            // Check if file is CSV
            if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
                toast.error("Please upload a CSV file only");
                return;
            }

            // Check file size (max 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }

            // Validate CSV content
            const isValid = await validateCSV(selectedFile);
            if (!isValid) {
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                return;
            }
            setFileData(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!fileData) {
            toast.error("Please select a CSV file first");
            return;
        }

        setIsUploading(true);
        const toastId = toast.loading("Uploading coupons...");

        try {
            const formData = new FormData();
            formData.append("file", fileData);
            const res = await bulkUploadCoupons(formData);
            if (res.success) {
                toast.success(res.message || "Coupons uploaded successfully!", { id: toastId });
                setFileData(null);
                setOpen(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.error(res.message || "Failed to upload coupons", { id: toastId });
            }

            // Temporary - remove after API integration
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success("Coupons uploaded successfully!", { id: toastId });
            setFileData(null);
            setOpen(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "Failed to upload coupons", { id: toastId });
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setFileData(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ButtonComponent buttonName="Bulk Upload" varient="purple" icon={Upload} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]!">
                <DialogHeader>
                    <DialogTitle>Bulk Upload Coupons</DialogTitle>
                    <DialogDescription>
                        Upload a CSV file to create multiple coupons at once.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* File Upload Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Upload CSV File <span className="text-red-500">*</span>
                        </label>

                        <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${fileData
                                ? "border-green-500 bg-green-50/10"
                                : "border-muted-foreground/25 hover:border-muted-foreground/50"
                                }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="hidden"
                                id="csv-upload"
                                disabled={isUploading}
                            />

                            {fileData ? (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-center">
                                        <FileUp className="h-12 w-12 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{fileData.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {(fileData.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleRemoveFile}
                                        disabled={isUploading}
                                    >
                                        <X className="h-4 w-4 mr-1" />
                                        Remove
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-center">
                                        <Upload className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Click to upload CSV file</p>
                                        <p className="text-xs text-muted-foreground">
                                            CSV files only (Max 5MB)
                                        </p>
                                    </div>
                                    <label htmlFor="csv-upload">
                                        <Button variant="outline" size="sm" asChild>
                                            <span>Select File</span>
                                        </Button>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Required Fields Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                        <p className="font-medium text-sm text-blue-900">Required CSV Fields:</p>
                        <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                            <li><strong>code</strong> - Coupon code</li>
                            <li><strong>amount</strong> - Coupon amount</li>
                            <li><strong>expiryDate</strong> - Expiry date (YYYY-MM-DD)</li>
                            <li><strong>batchId</strong> - Batch identifier</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <ButtonComponent buttonName="Cancel" varient="red" disabled={isUploading} />
                    </DialogClose>
                    <ButtonComponent onClick={handleUpload} varient="yellow" buttonName={isUploading ? "Uploading..." : "Upload Coupons"} disabled={!fileData || isUploading} />
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}