import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BellDotIcon, SunIcon } from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div>
      <header className="sticky top-0 z-999 flex border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background">
        <div className="w-full flex items-center justify-between gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="w-full flex items-center justify-between gap-2">
            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground/80">
                Good afternoon
              </span>
              <span className="text-lg font-semibold text-foreground">
                Welcome back, Bishal
              </span>
            </div>
            <div className="flex items-center gap-4">
              {/* TODO: Make This Dark Mode Button */}
              <div>
                <SunIcon className="w-6 h-6" />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors">
                    <BellDotIcon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white text-[10px] font-bold text-destructive-foreground shadow">
                      3
                    </span>
                    {/* Optional: subtle pulse animation on the badge */}
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {/* Mock CRM notifications */}
                    <div className="flex items-start gap-3 p-4 border-b hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">New lead assigned</p>
                        <p className="text-xs text-muted-foreground">Sarah Johnson just filled the contact form.</p>
                        <p className="text-xs text-muted-foreground/70">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border-b hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Deal won</p>
                        <p className="text-xs text-muted-foreground">Acme Corp deal ($45,000) moved to Closed-Won.</p>
                        <p className="text-xs text-muted-foreground/70">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 border-b hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Task overdue</p>
                        <p className="text-xs text-muted-foreground">Follow-up with TechGlobal is 3 days overdue.</p>
                        <p className="text-xs text-muted-foreground/70">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <button className="w-full text-center text-xs text-primary hover:underline">
                      View all notifications
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
              <div>
                <div className="relative group">
                  <button className="flex items-center gap-3 rounded-full pl-2 pr-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent/50 hover:text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                    <Avatar className="w-9 h-9 ring-2 ring-offset-2 ring-offset-background ring-primary/20">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/40 text-primary-foreground">
                        BI
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-semibold text-foreground">
                        Bishal
                      </span>
                      <span className="text-xs text-muted-foreground/70">
                        Developer
                      </span>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border bg-popover shadow-lg ring-1 ring-black/5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <div className="flex items-center gap-3 px-2 py-2">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>BI</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">Bishal</p>
                          <p className="text-xs text-muted-foreground">
                            bishal@example.com
                          </p>
                        </div>
                      </div>
                      <hr className="my-2" />
                      <a
                        href="/profile"
                        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        Profile
                      </a>
                      <a
                        href="/settings"
                        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        Settings
                      </a>
                      <hr className="my-2" />
                      <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
