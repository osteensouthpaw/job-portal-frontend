import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LikedPostCard from "../../_components/LikedPostCard";

const UserFavouritesPage = () => {
  return (
    <Card className="space-y-8">
      <CardHeader>
        <CardTitle>Jobs on your WatchList</CardTitle>
        <CardDescription>
          Manage jobs on your watchlist. You can view or remove jobs on your
          watchlist.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <LikedPostCard />
        <LikedPostCard />
        <LikedPostCard />
        <LikedPostCard />
        <LikedPostCard />
      </CardContent>
    </Card>
  );
};

export default UserFavouritesPage;
