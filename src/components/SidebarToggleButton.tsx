import { useStore } from "@/hooks/useStore";
import { Button } from "./ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const SidebarToggleButton = ({ className }: { className: string }) => {
  const { state, dispatch } = useStore();

  const onClick = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return (
    <Button onClick={onClick} variant={"outline"} className={className}>
      {state.isSidebarOpen ? <PanelRightClose /> : <PanelRightOpen />}
    </Button>
  );
};

export default SidebarToggleButton;
