import { Avatar, AvatarImage } from "@/components/ui/avatar";

//  AI Icon
export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1 bg-indigo-400/20" src="/logo.png" />
    </Avatar>
  );
};
