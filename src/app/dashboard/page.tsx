import NavBar from "@/components/general/NavBar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDownIcon } from "lucide-react";

export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-10 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>New Customers</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                1,234
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className="flex gap-1 rounded-lg text-xs"
                >
                  <TrendingDownIcon className="size-3" />
                  -20%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Down 20% this period <TrendingDownIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Acquisition needs attention
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>New Customers</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                1,234
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className="flex gap-1 rounded-lg text-xs"
                >
                  <TrendingDownIcon className="size-3" />
                  -20%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Down 20% this period <TrendingDownIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Acquisition needs attention
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>New Customers</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                1,234
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className="flex gap-1 rounded-lg text-xs"
                >
                  <TrendingDownIcon className="size-3" />
                  -20%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Down 20% this period <TrendingDownIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Acquisition needs attention
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
          <div className="flex gap-4  ">
            <section className="size-full">
              <Card>
                <CardHeader>
                  <CardTitle>Latest Applications</CardTitle>
                  <CardDescription>
                    Summary of latest applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
            <section className="">
              <Card>
                <CardHeader>
                  <CardTitle>Latest Applications</CardTitle>
                  <CardDescription>
                    Summary of latest applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Software Engineer</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Aspernatur, officiis!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
