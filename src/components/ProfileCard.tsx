import { User } from "@/types/types";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useStore } from "@/hooks/useStore";
import { getFilterValue } from "@/utils/getFilterValue";

interface ProfileCardProps {
  profile: User;
  filter: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, filter }) => {
  const { dispatch } = useStore();

  const handleCardClick = () => {
    dispatch({
      type: "SELECT_USER",
      payload: { user: profile, showLocation: false },
    });

    dispatch({
      type: "TOGGLE_PROFILE_MODAL",
    });
  };

  const handleSummaryClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent the card click event from firing
    dispatch({
      type: "SELECT_USER",
      payload: { user: profile, showLocation: true },
    });
  };

  return (
    <>
      <div
        className="p-2 hover:bg-zinc-200 hover:cursor-pointer rounded-sm"
        aria-label="profile card"
        key={profile.id}
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center gap-6">
            <Avatar>
              <AvatarImage
                className="max-w-12 max-h-12"
                src={profile.avatar}
              ></AvatarImage>
            </Avatar>
            <Button onClick={handleSummaryClick} className="nunito-medium">
              Summary
            </Button>
          </div>

          <div className="space-y-1">
            <p className="nunito-semibold text-base">{profile.fullName}</p>
            <p className="nunito-light text-sm">{profile.description}</p>
            {filter !== "fullName" ? (
              <p className="nunito-light text-sm">
                <span className="nunito-semibold">{filter}:</span>{" "}
                {getFilterValue(profile, filter)}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex justify-end"></div>
      </div>
      <Separator />
    </>
  );
};

export default ProfileCard;
