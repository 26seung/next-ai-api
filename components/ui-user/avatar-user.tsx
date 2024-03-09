import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  src?: string | null | undefined;
}
// user Icon
export const UserAvatar = ({ src }: AvatarProps) => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={src || "/placeholder.jpg"} />
    </Avatar>
  );
};
