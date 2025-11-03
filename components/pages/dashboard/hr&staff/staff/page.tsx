"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Grid3x3, List, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const executives = [
  {
    id: 1,
    name: "Sophia Carter",
    designation: "Senior Call Executive",
    location: "New York, NY",
    department: "Sales",
    email: "sophia.carter@crm.com",
    handle: "@sophiacarter",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    country: "🇺🇸",
    badge: "Admin",
    badgeColor: "bg-blue-100 text-blue-800",
    calls: 1234,
    followers: 29800,
    followings: 1125,
    updated: "1 hour ago",
  },
  {
    id: 2,
    name: "Daniel Lee",
    designation: "Call Executive",
    location: "San Francisco, CA",
    department: "Customer Support",
    email: "daniel.lee@crm.com",
    handle: "@daniellee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    country: "🇺🇸",
    badge: "Verified",
    badgeColor: "bg-green-100 text-green-800",
    calls: 856,
    followers: 12500,
    followings: 860,
    updated: "2 hours ago",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    designation: "Marketing Head",
    location: "Madrid, Spain",
    department: "Marketing",
    email: "maria.rodriguez@crm.com",
    handle: "@maria",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    country: "🇪🇸",
    badge: "Lead",
    badgeColor: "bg-purple-100 text-purple-800",
    calls: 1432,
    followers: 18400,
    followings: 1432,
    updated: "3 hours ago",
  },
  {
    id: 4,
    name: "Liam Zhang",
    designation: "Frontend Developer",
    location: "Beijing, China",
    department: "Technical",
    email: "liam.zhang@crm.com",
    handle: "@liamdev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    country: "🇨🇳",
    badge: "Contributor",
    badgeColor: "bg-orange-100 text-orange-800",
    calls: 540,
    followers: 9300,
    followings: 540,
    updated: "10 mins ago",
  },
  {
    id: 5,
    name: "Ethan Wright",
    designation: "Senior Backend Engineer",
    location: "Toronto, Canada",
    department: "Technical",
    email: "ethan.wright@crm.com",
    handle: "@DevOps",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    country: "🇨🇦",
    badge: "Moderator",
    badgeColor: "bg-indigo-100 text-indigo-800",
    calls: 734,
    followers: 16400,
    followings: 734,
    updated: "45 mins ago",
  },
  {
    id: 6,
    name: "Isabella Moretti",
    designation: "Content Strategist",
    location: "Milan, Italy",
    department: "Marketing",
    email: "isabella.moretti@crm.com",
    handle: "@isamoretti",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    country: "🇮🇹",
    badge: "Top Creator",
    badgeColor: "bg-red-100 text-red-800",
    calls: 921,
    followers: 24700,
    followings: 921,
    updated: "2 hours ago",
  },
  {
    id: 7,
    name: "Kenji Tanaka",
    designation: "Full Stack Developer",
    location: "Tokyo, Japan",
    department: "Technical",
    email: "kenji.tanaka@crm.com",
    handle: "@kenjitcode",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji",
    country: "🇯🇵",
    badge: "Contributor",
    badgeColor: "bg-cyan-100 text-cyan-800",
    calls: 678,
    followers: 13900,
    followings: 678,
    updated: "30 mins ago",
  },
  {
    id: 8,
    name: "Amira El-Sayed",
    designation: "Data Scientist",
    location: "Cairo, Egypt",
    department: "Analytics",
    email: "amira.codes@crm.com",
    handle: "@amira.ai",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amira",
    country: "🇪🇬",
    badge: "Analyst",
    badgeColor: "bg-yellow-100 text-yellow-800",
    calls: 998,
    followers: 21100,
    followings: 998,
    updated: "20 mins ago",
  },
]

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedDesignation, setSelectedDesignation] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)




  const filteredExecutives = executives.filter((exec) => {
    const matchesSearch =
      exec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exec.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDesignation = selectedDesignation === "all" || exec.designation === selectedDesignation
    const matchesLocation = selectedLocation === "all" || exec.location === selectedLocation
    const matchesDepartment = selectedDepartment === "all" || exec.department === selectedDepartment

    return matchesSearch && matchesDesignation && matchesLocation && matchesDepartment
  })

  const itemsPerPage = viewMode === "grid" ? 8 : 10
  const totalPages = Math.ceil(filteredExecutives.length / itemsPerPage)
  const paginatedExecutives = filteredExecutives.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const designations = ["all", ...new Set(executives.map((e) => e.designation))]
  const locations = ["all", ...new Set(executives.map((e) => e.location))]
  const departments = ["all", ...new Set(executives.map((e) => e.department))]

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Call Executives</h1>
              <p className="text-muted-foreground mt-1">Manage your call center team</p>
            </div>
            <div className="text-sm text-muted-foreground">
              UBold <span className="mx-2">›</span> Apps <span className="mx-2">›</span> Call Executives
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search executive name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Select value={selectedDesignation} onValueChange={setSelectedDesignation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {designations.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d === "all" ? "All Designations" : d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l === "all" ? "All Locations" : l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d === "all" ? "All Departments" : d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="default">Apply</Button>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 justify-end">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {paginatedExecutives.map((exec) => (
              <Link key={exec.id} href={`/call-executives/${exec.id}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="text-center">
                    <img
                      src={exec.avatar || "/placeholder.svg"}
                      alt={exec.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4"
                    />
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <h3 className="font-bold text-foreground">{exec.name}</h3>
                      <span className="text-lg">{exec.country}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{exec.designation}</p>
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${exec.badgeColor}`}>
                        {exec.badge}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">{exec.handle}</p>
                    <p className="text-xs text-muted-foreground mb-4">{exec.email}</p>
                    <div className="flex gap-2 mb-4">
                      <Button variant="default" size="sm" className="flex-1">
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Follow
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="font-bold text-foreground">{exec.calls}</p>
                        <p className="text-xs text-muted-foreground">Calls</p>
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{(exec.followers / 1000).toFixed(1)}k</p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{(exec.followings / 1000).toFixed(1)}k</p>
                        <p className="text-xs text-muted-foreground">Following</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">Updated {exec.updated}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="space-y-3 mb-8">
            {paginatedExecutives.map((exec) => (
              <Link key={exec.id} href={`/call-executives/${exec.id}`}>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <img src={exec.avatar || "/placeholder.svg"} alt={exec.name} className="w-12 h-12 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground">{exec.name}</h3>
                        <span className="text-lg">{exec.country}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${exec.badgeColor}`}>
                          {exec.badge}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{exec.designation}</p>
                      <p className="text-xs text-muted-foreground">{exec.location}</p>
                    </div>
                    <div className="hidden md:flex gap-8 text-center">
                      <div>
                        <p className="font-bold text-foreground">{exec.calls}</p>
                        <p className="text-xs text-muted-foreground">Calls</p>
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{(exec.followers / 1000).toFixed(1)}k</p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{(exec.followings / 1000).toFixed(1)}k</p>
                        <p className="text-xs text-muted-foreground">Following</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredExecutives.length)} of {filteredExecutives.length} executives
        </p>
      </div>
    </div>
  )
}
