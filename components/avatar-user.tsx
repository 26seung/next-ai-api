import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// USer Icon
export const UserAvatar = () => {
  //   const { user } = useUser();

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="https://github.com/shadcn.png" />
      {/* <AvatarImage src={user?.profileImageUrl} /> */}
      <AvatarFallback>
        ME
        {/* {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)} */}
      </AvatarFallback>
    </Avatar>
  );
};
