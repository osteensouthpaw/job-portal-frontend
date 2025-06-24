import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import jobPostService from "@/services/jobPost-service";
import { cookies } from "next/headers";
import LikedPostCard from "../../_components/LikedPostCard";

const UserFavouritesPage = async () => {
  const cookieString = (await cookies()).toString();
  const jobPosts = await jobPostService
    .getLikedJobPosts(cookieString)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  if (!jobPosts || jobPosts.content.length === 0) {
    return (
      <Card className="space-y-8">
        <CardHeader>
          <CardTitle>WatchList</CardTitle>
          <CardDescription>You have no jobs on your watchlist.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

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
        {jobPosts.content.map((jobPost) => (
          <LikedPostCard jobPost={jobPost} key={jobPost.id} />
        ))}
      </CardContent>
    </Card>
  );
};

export default UserFavouritesPage;
