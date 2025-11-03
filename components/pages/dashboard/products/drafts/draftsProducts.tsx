"use client"


import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Download, Eye, Grid3x3, List, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Earbuds",
    sku: "WB-10245",
    category: "Electronics",
    stock: 56,
    price: 59.99,
    sold: 124,
    rating: 5,
    reviews: 87,
    status: "Published",
    date: "28 Oct, 2025",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
    by: "My Furniture",
  },
  {
    id: 2,
    name: "Smart LED Desk Lamp",
    sku: "SL-89012",
    category: "Home & Office",
    stock: 32,
    price: 39.49,
    sold: 78,
    rating: 4,
    reviews: 54,
    status: "Pending",
    date: "28 Oct, 2025",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop",
    by: "BrightLite",
  },
  {
    id: 3,
    name: "Men's Running Shoes",
    sku: "RS-20450",
    category: "Fashion",
    stock: 120,
    price: 89.00,
    sold: 231,
    rating: 5,
    reviews: 142,
    status: "Published",
    date: "28 Oct, 2025",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    by: "ActiveWear Co.",
  },
  {
    id: 4,
    name: "Fitness Tracker Watch",
    sku: "FT-67123",
    category: "Fitness",
    stock: 78,
    price: 49.95,
    sold: 198,
    rating: 4,
    reviews: 89,
    status: "Published",
    date: "21 Oct, 2025",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop",
    by: "FitPulse",
  },
  {
    id: 5,
    name: "Gaming Mouse RGB",
    sku: "GM-72109",
    category: "Gaming",
    stock: 120,
    price: 29.99,
    sold: 243,
    rating: 3,
    reviews: 102,
    status: "Published",
    date: "22 Oct, 2025",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    by: "HyperClick",
  },
  {
    id: 6,
    name: "Modern Lounge Chair",
    sku: "FC-31220",
    category: "Furniture",
    stock: 24,
    price: 199.00,
    sold: 38,
    rating: 5,
    reviews: 27,
    status: "Rejected",
    date: "25 Oct, 2025",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=200&fit=crop",
    by: "UrbanLiving",
  },
  {
    id: 7,
    name: "Plush Toy Bear",
    sku: "TY-00788",
    category: "Toys",
    stock: 150,
    price: 15.99,
    sold: 305,
    rating: 4,
    reviews: 120,
    status: "Published",
    date: "04 Oct, 2025",
    image: "https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=200&h=200&fit=crop",
    by: "Softies",
  },
  {
    id: 8,
    name: '55" Ultra HD Smart TV',
    sku: "TV-5588",
    category: "Electronics",
    stock: 64,
    price: 499.00,
    sold: 142,
    rating: 4,
    reviews: 88,
    status: "Published",
    date: "18 Oct, 2025",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
    by: "ViewMaster",
  },
];

const DraftsProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    const matchesStatus = status === "all" || product.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "text-amber-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };

  const toggleSelectProduct = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pid => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Drafts Products</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <span className="font-medium text-gray-900">CRM</span>
              <span>›</span>
              <span>Dashboard</span>
              <span>›</span>
              <span>Drafts Products</span>
            </div>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white border-0 shadow-sm p-4 md:p-5 mb-5">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by product name or SKU..."
                className="pl-10 border-gray-200"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Home & Office">Home & Office</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Toys">Toys</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-36 border-gray-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Products Display */}
        {viewMode === "list" ? (
          /* List View */
          <Card className="bg-white border-0 shadow-sm overflow-hidden mb-5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sold</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleSelectProduct(product.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                            <p className="text-xs text-gray-500">by {product.by}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product.sku}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{product.stock}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-semibold">${product.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product.sold}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {renderStars(product.rating)}
                          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-indigo-50 hover:text-indigo-600">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
            {paginatedProducts.map((product) => (
              <Card key={product.id} className="bg-white border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" className="bg-white hover:bg-gray-100 text-gray-900 h-9 w-9">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="bg-white hover:bg-gray-100 text-gray-900 h-9 w-9">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="bg-white hover:bg-gray-100 text-gray-900 h-9 w-9">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">{product.category}</span>
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-lg font-bold text-gray-900">${product.price}</p>
                      <p className="text-xs text-gray-500">{product.sold} sold</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{product.stock}</p>
                      <p className="text-xs text-gray-500">in stock</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-gray-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={currentPage === pageNum ? "bg-indigo-600 hover:bg-indigo-700" : "border-gray-200"}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-200"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftsProducts;
