"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLikedJobPosts } from "@/hooks/useJobPosts";
import LikedPostCard from "../../_components/LikedPostCard";

const UserFavouritesPage = () => {
  const { data: jobPosts } = useLikedJobPosts();

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
      <CardContent className="grid gap-6">
        {jobPosts.content.map((jobPost) => (
          <LikedPostCard jobPost={jobPost} key={jobPost.id} />
        ))}
      </CardContent>
    </Card>
  );
};

export default UserFavouritesPage;
