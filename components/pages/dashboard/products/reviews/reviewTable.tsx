"use client"


import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle, Eye, Search, ShoppingCart, Star, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Mock Data
const mockReviews = [
  {
    id: "REV001",
    product: {
      name: "Wireless Headphones Pro",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      sku: "WHP-001",
    },
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
    },
    orderId: "ORD-2024-1234",
    rating: 5,
    comment: "Amazing sound quality! The noise cancellation is superb and battery life exceeds expectations.",
    status: "approved",
    date: "2024-01-15",
  },
  {
    id: "REV002",
    product: {
      name: "Smart Watch Ultra",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      sku: "SWU-002",
    },
    customer: {
      name: "Michael Chen",
      email: "m.chen@email.com",
    },
    orderId: "ORD-2024-1235",
    rating: 4,
    comment: "Great features but the battery could be better. Overall satisfied with the purchase.",
    status: "pending",
    date: "2024-01-16",
  },
  {
    id: "REV003",
    product: {
      name: "Premium Laptop Bag",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
      sku: "PLB-003",
    },
    customer: {
      name: "Emma Wilson",
      email: "emma.w@email.com",
    },
    orderId: "ORD-2024-1236",
    rating: 2,
    comment: "The material quality is not as described. Disappointed with this purchase.",
    status: "rejected",
    date: "2024-01-17",
  },
  {
    id: "REV004",
    product: {
      name: "Ergonomic Mouse",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
      sku: "ERM-004",
    },
    customer: {
      name: "David Park",
      email: "d.park@email.com",
    },
    orderId: "ORD-2024-1237",
    rating: 5,
    comment: "Perfect for long working hours. No more wrist pain!",
    status: "approved",
    date: "2024-01-18",
  },
  {
    id: "REV005",
    product: {
      name: "Mechanical Keyboard RGB",
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop",
      sku: "MKR-005",
    },
    customer: {
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
    },
    orderId: "ORD-2024-1238",
    rating: 4,
    comment: "Love the typing feel and RGB effects. A bit loud for office use though.",
    status: "pending",
    date: "2024-01-19",
  },
  {
    id: "REV006",
    product: {
      name: "USB-C Hub Adapter",
      image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=100&h=100&fit=crop",
      sku: "UCH-006",
    },
    customer: {
      name: "James Miller",
      email: "james.m@email.com",
    },
    orderId: "ORD-2024-1239",
    rating: 5,
    comment: "Essential accessory for my laptop. Works perfectly with all my devices.",
    status: "approved",
    date: "2024-01-20",
  },
  {
    id: "REV007",
    product: {
      name: "Wireless Charging Pad",
      image: "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=100&h=100&fit=crop",
      sku: "WCP-007",
    },
    customer: {
      name: "Olivia Brown",
      email: "olivia.b@email.com",
    },
    orderId: "ORD-2024-1240",
    rating: 3,
    comment: "Charges slowly compared to wired charging. Design is nice though.",
    status: "pending",
    date: "2024-01-21",
  },
  {
    id: "REV008",
    product: {
      name: "Bluetooth Speaker",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop",
      sku: "BTS-008",
    },
    customer: {
      name: "Robert Taylor",
      email: "robert.t@email.com",
    },
    orderId: "ORD-2024-1241",
    rating: 4,
    comment: "Great sound for the price. Battery life could be better.",
    status: "approved",
    date: "2024-01-22",
  },
  {
    id: "REV009",
    product: {
      name: "Portable External SSD",
      image: "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=100&h=100&fit=crop",
      sku: "PESS-009",
    },
    customer: {
      name: "Sophia Davis",
      email: "sophia.d@email.com",
    },
    orderId: "ORD-2024-1242",
    rating: 5,
    comment: "Fast and reliable. Worth the price.",
    status: "approved",
    date: "2024-01-23",
  },
  {
    id: "REV010",
    product: {
      name: "External Monitor",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      sku: "EM-010",
    },
    customer: {
      name: "Michael Chen",
      email: "m.chen@email.com",
    },
    orderId: "ORD-2024-1243",
    rating: 4,
    comment: "Good display quality. Worth the price.",
    status: "approved",
    date: "2024-01-24",
  },
  {
    id: "REV011",
    product: {
      name: "Wireless Mouse",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
      sku: "WM-011",
    },
    customer: {
      name: "Emma Wilson",
      email: "emma.w@email.com",
    },
    orderId: "ORD-2024-1244",
    rating: 3,
    comment: "Works fine. Could use some more buttons.",
    status: "pending",
    date: "2024-01-25",
  },
];

const ProductReviewsTable = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedReview, setSelectedReview] = useState<typeof mockReviews[0] | null>(null);

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: "bg-teal-50 text-teal-700 border-teal-200",
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
    };
    
    return (
      <span className={`text-xs px-2.5 py-1 rounded-full border ${styles[status as keyof typeof styles]} font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleStatusChange = (reviewId: string, newStatus: string) => {
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === "pending").length,
    approved: reviews.filter(r => r.status === "approved").length,
    rejected: reviews.filter(r => r.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Product Reviews</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <span className="font-medium text-gray-900">UBold</span>
              <span>›</span>
              <span>Ecommerce</span>
              <span>›</span>
              <span>Reviews</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
          <Card className="bg-white border-0 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</h3>
                <p className="text-sm text-gray-500">Total Reviews</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-amber-600 mb-1">{stats.pending}</h3>
                <p className="text-sm text-gray-500">Pending Review</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-teal-600 mb-1">{stats.approved}</h3>
                <p className="text-sm text-gray-500">Approved</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-red-600 mb-1">{stats.rejected}</h3>
                <p className="text-sm text-gray-500">Rejected</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white border-0 shadow-sm p-4 md:p-5 mb-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by product, customer, or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Reviews Table */}
        <Card className="bg-white border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Review</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          width={48}
                          height={48}
                          src={review.product.image}
                          alt={review.product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">{review.product.name}</p>
                          <p className="text-xs text-gray-500">{review.product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{review.customer.name}</p>
                        <p className="text-xs text-gray-500 truncate">{review.customer.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-gray-900">
                        <ShoppingCart className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-medium">{review.orderId}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{renderStars(review.rating)}</td>
                    <td className="px-4 py-3">
                      <p className="max-w-xs text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(review.status)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{review.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleStatusChange(review.id, "approved")}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-teal-50 hover:text-teal-600 text-gray-600 transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(review.id, "pending")}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-amber-50 hover:text-amber-600 text-gray-600 transition-colors"
                          title="Mark Pending"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(review.id, "rejected")}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-600 transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination Info */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </p>
        </div>

        {/* Review Detail Modal Overlay */}
        {selectedReview && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedReview(null)}
          >
            <Card 
              className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Review Details</h2>
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Product Info */}
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                    <Image
                      width={80}
                      height={80}
                      src={selectedReview?.product.image}
                      alt={selectedReview.product.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{selectedReview.product.name}</h3>
                      <p className="text-sm text-gray-500">SKU: {selectedReview.product.sku}</p>
                      <p className="text-sm text-gray-500">Order: {selectedReview.orderId}</p>
                    </div>
                  </div>

                  {/* Customer & Rating */}
                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Customer</p>
                      <p className="font-semibold text-gray-900">{selectedReview.customer.name}</p>
                      <p className="text-sm text-gray-500">{selectedReview.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase mb-1">Rating</p>
                      {renderStars(selectedReview.rating)}
                      <p className="text-sm text-gray-500 mt-1">{selectedReview.date}</p>
                    </div>
                  </div>

                  {/* Review Comment */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-2">Review</p>
                    <p className="text-gray-700 leading-relaxed">{selectedReview.comment}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-2">Status</p>
                    {getStatusBadge(selectedReview.status)}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => {
                        handleStatusChange(selectedReview.id, "approved");
                        setSelectedReview(null);
                      }}
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => {
                        handleStatusChange(selectedReview.id, "rejected");
                        setSelectedReview(null);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviewsTable;