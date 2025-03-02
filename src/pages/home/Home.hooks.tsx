import { useMutation } from "@tanstack/react-query";
import { searchUsers } from "../../services/users";
import { SyntheticEvent, useContext, useState } from "react";
import { AppContext } from "../../configs/AppContext";
import { UserResponse } from "../../types/user.type";

export const useInitialValues = () => {
  const [_, dispatch] = useContext(AppContext);
  const [search, setSearch] = useState<string>("");
  const [resultKeyword, setResultKeyword] = useState<string>("");
  const [data, setData] = useState<UserResponse[] | undefined>(undefined);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["searchUsers"],
    mutationFn: () => searchUsers({ q: search, per_page: 5 }),
    onSuccess: (e: any) => {
      if (e.status === 200) {
        setData(e.data?.items);
        setResultKeyword(search);
      } else {
        setData(undefined);
        handleError(`${e.response?.data?.status} ${e.response?.data?.message}`);
      }
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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return { data, handleSubmit, search, setSearch, isPending, resultKeyword };
};
