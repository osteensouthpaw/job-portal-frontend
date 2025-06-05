import { Input } from "@/components/ui/input";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";

export default function SearchInput() {
  const { register, handleSubmit } = useForm<{ search: string }>();

  const onSubmit = (data: { search: string }) => {
    //send api request
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full max-w-sm items-center gap-1.5"
    >
      <div className="relative">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </div>
        <Input
          id="search"
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8"
          {...register("search")}
        />
      </div>
    </form>
  );
}

function SearchIcon(props: PropsWithChildren<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
