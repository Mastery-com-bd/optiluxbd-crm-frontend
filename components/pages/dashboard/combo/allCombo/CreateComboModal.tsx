'use client';

import { useState } from "react";
import ButtonComponent from "@/components/ui/ButtonComponent";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Plus, X, Search, Package, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const dummyProducts = [
    { id: 1, name: "Premium Coffee Beans", price: 25.00, sku: "CF-001" },
    { id: 2, name: "Stainless Steel Grinder", price: 45.00, sku: "GR-052" },
    { id: 3, name: "Paper Filters (100pk)", price: 8.50, sku: "FL-109" },
    { id: 4, name: "Glass Pour Over", price: 32.00, sku: "GL-441" },
    { id: 5, name: "Digital Coffee Scale", price: 19.99, sku: "SC-902" },
];

const CreateComboModal = () => {
    // Form States
    const [comboName, setComboName] = useState("");
    const [description, setDescription] = useState("");
    const [comboPrice, setComboPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");

    const [selectedProducts, setSelectedProducts] = useState<(typeof dummyProducts[0] & { quantity: number })[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleProduct = (product: typeof dummyProducts[0]) => {
        const isSelected = selectedProducts.find(p => p.id === product.id);
        if (isSelected) {
            setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
        } else {
            setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
        }
    };

    // কোয়ান্টিটি লজিক
    const updateQuantity = (id: number, delta: number) => {
        setSelectedProducts(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, quantity: Math.max(1, p.quantity + delta) };
            }
            return p;
        }));
    };

    const totalPrice = selectedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

    // সব ডাটা অবজেক্ট আকারে কনসোল করা
    const handleSubmit = () => {
        const comboData = {
            name: comboName,
            description: description,
            finalComboPrice: comboPrice,
            discount: discountPrice,
            totalOriginalPrice: totalPrice,
            products: selectedProducts
        };
        console.log("Submitting Combo Data:", comboData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonComponent buttonName="Create Combo" icon={Plus} varient="dark yellow" />
            </DialogTrigger>
            <DialogContent className="max-w-4xl! text-white border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create New Combo</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Select products from the right to build your combo on the left.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 h-[450px]">
                    {/* বাম পাশ: আপনার অরিজিনাল স্টাইল */}
                    <div className="overflow-y-auto flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label>Combo Name</Label>
                            <Input placeholder="Enter Combo Name" onChange={(e) => setComboName(e.target.value)} />
                            <Label>Description</Label>
                            <Textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="flex flex-col rounded-xl border border-white/10 bg-white/5">
                            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Package size={18} /> Selected Products({selectedProducts.length})
                                </h3>
                                <span className="text-xs text-gray-400">Total: ${totalPrice.toFixed(2)}</span>
                            </div>

                            <ScrollArea className="flex-1 py-4">
                                {selectedProducts.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2 mt-10">
                                        <Package size={40} strokeWidth={1} />
                                        <p className="text-sm">No products selected yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 w-full px-4">
                                        {selectedProducts.map((product) => (
                                            <div key={product.id} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10 group">
                                                <div>
                                                    <p className="text-sm font-medium">{product.name}</p>
                                                    <p className="text-xs text-gray-500">${product.price}</p>
                                                </div>
                                                <div className="flex justify-between w-[40%] items-center">
                                                    <div className="flex gap-3 items-center bg-black/20 px-2 py-1 rounded-md border border-white/5">
                                                        <Minus size={14} className="cursor-pointer hover:text-yellow-500" onClick={() => updateQuantity(product.id, -1)} />
                                                        <span className="text-sm">{product.quantity}</span>
                                                        <Plus size={14} className="cursor-pointer hover:text-yellow-500" onClick={() => updateQuantity(product.id, 1)} />
                                                    </div>
                                                    <button onClick={() => toggleProduct(product)} className="p-1 hover:text-red-500">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>
                        </div>

                        <div className="p-4 flex flex-col gap-4">
                            <Label>Combo Price</Label>
                            <Input placeholder="Enter Combo Price" type="number" onChange={(e) => setComboPrice(e.target.value)} />
                            <hr className="border-white/10" />
                            <Label>Discount Price</Label>
                            <Input placeholder="Enter Discount Price" type="number" onChange={(e) => setDiscountPrice(e.target.value)} />
                        </div>
                    </div>

                    {/* ডান পাশ: Product Selection */}
                    <div className="flex flex-col space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <Input
                                placeholder="Search products..."
                                className="pl-10 bg-white/5 border-white/10"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <ScrollArea className="flex-1 rounded-xl border border-white/10 p-2">
                            <div className="space-y-1">
                                {dummyProducts
                                    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map((product) => {
                                        const isSelected = selectedProducts.find(p => p.id === product.id);
                                        return (
                                            <div
                                                key={product.id}
                                                onClick={() => toggleProduct(product)}
                                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-yellow-500/10 border border-yellow-500/50' : 'hover:bg-white/5 border border-transparent'}`}
                                            >
                                                <div>
                                                    <p className="text-sm font-medium">{product.name}</p>
                                                    <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                                                </div>
                                                <p className="text-sm font-semibold">${product.price}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                <DialogFooter className="flex flex-row gap-3 sm:justify-between pt-4 border-t border-white/10">
                    <DialogClose asChild>
                        <div className="w-[30%]">
                            <ButtonComponent varient="red" buttonName="Cancel" className="w-full" />
                        </div>
                    </DialogClose>
                    <div className="w-[70%]">
                        <ButtonComponent
                            onClick={handleSubmit}
                            varient="yellow"
                            buttonName={`Submit Combo ($${totalPrice.toFixed(2)})`}
                            className="w-full"
                        />
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateComboModal;