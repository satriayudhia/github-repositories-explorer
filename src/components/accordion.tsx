import { useContext, useState } from "react";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa6";
import { UserResponse } from "../types/user.type";
import { useMutation } from "@tanstack/react-query";
import { APIPUBLIC } from "../configs/api";
import LoadingIndicator from "./loadingIndicator";
import { RepoResponse } from "../types/repo.type";
import { AxiosError } from "axios";
import { AppContext } from "../configs/AppContext";

const Accordion = ({ repos_url, login }: UserResponse) => {
  const [_, dispatch] = useContext(AppContext);
  const [open, setOpen] = useState<boolean>(false);

  const getRepositories = async () => {
    if (repos_url) {
      const res = await APIPUBLIC.get(repos_url);

      if (res.status === 200) {
        return res.data;
      } else {
        return res;
      }
    }
  };

  const { mutateAsync, data, isPending } = useMutation({
    mutationKey: ["getRepositories"],
    mutationFn: () => getRepositories(),
    onError: (e: AxiosError<{ message: string; status: string }>) => {
      handleError(`${e.response?.data?.status} ${e.response?.data?.message}`);
    },
  });

  const handleError = (message: string) => {
    dispatch({
      type: "SET_ALERT",
      payload: {
        show: true,
        message: message,
        type: "failed",
      },
    });
  };

  const handleExpand = async () => {
    if (isPending) return;
    if (!data) await mutateAsync();
    setOpen(!open);
  };

  return (
    <>
      <div
        className="bg-gray-100 p-4 flex justify-between gap-4 cursor-pointer mb-4"
        onClick={handleExpand}
      >
        <div className="font-semibold">{login}</div>

        {!open && !isPending && <FaChevronDown size={20} />}
        {open && !isPending && <FaChevronUp size={20} />}
        {isPending && (
          <div>
            <LoadingIndicator background="#000" />
          </div>
        )}
      </div>

      {open &&
        data &&
        data.length > 0 &&
        data?.map((item: RepoResponse) => (
          <div key={item.id} className="bg-gray-200 px-4 pt-4 pb-10 my-2 ml-6">
            <div className="flex justify-between items-center gap-4">
              <h1 className="font-semibold text-lg">{item?.name}</h1>

              <div className="flex items-center gap-2">
                <div>{item?.stargazers_count}</div>
                <FaStar size={20} />
              </div>
            </div>

            <div>{item?.description}</div>
          </div>
        ))}

      {open && data?.length === 0 && (
        <div className="font-semibold ml-6 my-2 pb-6">No repository found</div>
      )}
    </>
  );
};

export default Accordion;
