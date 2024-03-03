import { memo } from "react";
import { useParams } from "react-router-dom";
import { getUserDetail } from "../../services";
import useFetchData from "../../hooks/useFetchData";
import NotFoundPage from "../NotFound";
import UserFormView from "./UserFormView";

const UserFormPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetchData(getUserDetail(id), {
    disabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <NotFoundPage />;
  }

  return <UserFormView id={id} defaultValues={data} />;
};

export default memo(UserFormPage);
