import { useStore } from "@/hooks/useStore";
import { Filters } from "@/types/types";
import { getFilterValue } from "@/utils/getFilterValue";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import ProfileCard from "./ProfileCard";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import SidebarToggleButton from "./SidebarToggleButton";

const AppSidebar: React.FC = () => {
  const { state, dispatch } = useStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] =
    useState<keyof Filters>("fullName");

  // const toggleSidebar = () => {
  //   dispatch({ type: "TOGGLE_SIDEBAR" });
  // };

  function authenticate() {
    dispatch({ type: "AUTHENTICATE" });
  }

  function openDashboard() {
    dispatch({ type: "TOGGLE_DASHBOARD" });
  }

  const filteredProfiles = useMemo(() => {
    if (!searchQuery) return state.profiles;

    return state.profiles.filter((profile) => {
      const value = getFilterValue(profile, selectedFilter || "fullName");
      return value?.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, state.profiles, selectedFilter]);

  const isOpen = state.isSidebarOpen;
  const isAdmin = state.isAdmin;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "110%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="absolute h-[98vh] w-72 sm:w-96 bg-zinc-50 top-2 right-2 bottom-2 z-[1000] rounded-lg shadow-lg pl-2 pr-1 py-2  flex flex-col"
      aria-label="sidebar"
    >
      <div className="border-none rounded-md m-2">
        <div className="flex items-center justify-between mx-2 mb-4">
          <h1 className="nunito-semibold text-base ">GeoProfiles</h1>
          <div className="flex gap-2">
            {isAdmin ? (
              <Button onClick={openDashboard} variant={"outline"}>
                Dashboard ✨
              </Button>
            ) : (
              <Button onClick={authenticate} variant={"outline"}>
                Log In
              </Button>
            )}
            <SidebarToggleButton className="px-4" />
          </div>
        </div>
        <div className="flex gap-1 -mx-1">
          <Input
            className="w-44"
            value={searchQuery}
            type="text"
            placeholder={`search by ${
              selectedFilter === "fullName"
                ? "name"
                : selectedFilter === "jobTitle"
                ? "job title"
                : selectedFilter
            }`}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            onValueChange={(value) => setSelectedFilter(value as keyof Filters)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="fullName">Name</SelectItem>
                <SelectItem value="country">Country</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="jobTitle">Job Title</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-zinc-500 scrollbar-track-zinc-300 scrollbar-rounded-lg">
        {filteredProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            filter={selectedFilter}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AppSidebar;
