import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "@/hooks/useStore";
import { BriefcaseBusiness, Building2, Mail, UserPlus } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { User } from "@/types/types";

const Dashboard = () => {
  const { state, dispatch } = useStore();

  const openEdit = (profileId: string) => {
    const selectedProfile = state.profiles.find(
      (profile) => profile.id === profileId
    );
    dispatch({
      type: "EDIT_PROFILE",
      payload: {
        user: selectedProfile as User,
      },
    });
  };

  const addProfile = () => {
    dispatch({
      type: "ADD_PROFILE",
    });
  };

  const closeDashboard = () => {
    dispatch({
      type: "TOGGLE_DASHBOARD",
    });
  };

  const logout = () => {
    dispatch({
      type: "AUTHENTICATE",
    });
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 scrollbar-thin">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav className="flex justify-between items-center mb-6 mx-4">
          <Button
            onClick={closeDashboard}
            variant={"link"}
            className="hover:no-underline"
          >
            <h1 className="text-2xl font-semibold text-gray-800">
              GeoProfiles
            </h1>
          </Button>
          <div className="flex gap-8">
            <Button onClick={closeDashboard} variant={"ghost"}>
              Home
            </Button>
            <Button
              className=" bg-zinc-700 hover:bg-zinc-900"
              variant={"default"}
              onClick={addProfile}
            >
              <UserPlus /> Add Profile
            </Button>
            <Button
              onClick={logout}
              variant={"outline"}
              className="text-gray-800 hover:text-white border-gray-300 hover:bg-gray-800 transition-colors duration-300"
            >
              Logout
            </Button>
          </div>
        </nav>

        {/* Profile Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {state.profiles.map((profile) => (
            <Card
              key={profile.id}
              className="max-w-xs cursor-pointer rounded-lg border border-gray-200 shadow-lg hover:bg-gray-100 transition-colors duration-300"
              onClick={() => openEdit(profile.id)}
            >
              <CardHeader className="flex flex-col items-center p-4">
                <Avatar className="mb-3">
                  <AvatarImage src={profile.avatar} />
                </Avatar>
                <CardTitle className="text-lg font-medium text-gray-800">
                  {profile.fullName}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-3 px-4">
                {/* Job Title */}
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <BriefcaseBusiness className="text-gray-500 w-5 h-5" />
                  {profile.jobTitle}
                </p>

                {/* Company */}
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="text-gray-500 w-5 h-5" />
                  {profile.company}
                </p>
              </CardContent>

              <CardFooter className="px-4 pb-4">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="text-gray-500 w-5 h-5" /> {profile.email}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
