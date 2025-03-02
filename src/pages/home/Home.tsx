import Accordion from "../../components/accordion";
import Button from "../../components/button";
import Input from "../../components/input";
import { UserResponse } from "../../types/user.type";
import { useInitialValues } from "./Home.hooks";

const Home = () => {
  const { data, handleSubmit, search, setSearch, isPending, resultKeyword } =
    useInitialValues();

  return (
    <div className="bg-slate-400 min-h-screen">
      <div className="max-w-md mx-auto bg-white min-h-screen p-4">
        <form onSubmit={handleSubmit}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isPending}
          />

          <Button
            type="submit"
            text="Search"
            disabled={isPending}
            loading={isPending}
          />
        </form>

        {data && data?.length > 0 && (
          <div className="my-4 text-gray-600">
            Showing users for "{resultKeyword}"
          </div>
        )}

        {!data?.length && data !== undefined && (
          <div className="font-semibold mt-4">No data found</div>
        )}
        {data &&
          data?.length > 0 &&
          data?.map((item: UserResponse) => (
            <Accordion
              key={item.id}
              repos_url={item.repos_url}
              login={item.login}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
