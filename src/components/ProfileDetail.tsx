import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStore } from "@/hooks/useStore";
import ProfileForm from "./ProfileForm";

const ProfileDetail = () => {
  const { state, dispatch } = useStore();
  const isMobile = useIsMobile();

  const onOpenChange = () => {
    dispatch({
      type: "TOGGLE_PROFILE_MODAL",
    });
  };

  if (isMobile) {
    return (
      <Drawer open={state.isProfileModalOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="z-[1000]">
          <DrawerHeader className="text-left">
            <DrawerTitle>
              {state.isAdmin ? "Edit profile" : "Profile Details"}
            </DrawerTitle>
          </DrawerHeader>
          <ProfileForm className="px-4" />
          <DrawerFooter className="pt-2">
            {state.isAdmin && state.isDashboardOpen ? null : (
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={state.isProfileModalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] sm:h-[450px] h-96 overflow-auto scrollbar-none scrollbar-track-zinc-200 scrollbar-thumb-zinc-400  z-[1000]">
        <DialogHeader>
          <DialogTitle>
            {state.isAdmin ? "Edit profile" : "Profile Details"}
          </DialogTitle>
          {state.isAdmin && (
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          )}
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetail;
