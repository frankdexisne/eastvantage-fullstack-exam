import AppCard from "../AppCard";
import { Button } from "../../ui/button";
import { PlusIcon } from "lucide-react";
import AppTable from "../AppTable";
import { useHistory } from "react-router-dom";
import { Label } from "../../ui/label";
import { useSelector, useDispatch } from "react-redux";
import type { IRoleWithUser } from "../../../store/slices/user";
import type { RootState } from "../../../store";
import { userActions } from "../../../store/slices/user";
import usePaginateTable from "../../../hooks/use-paginate-table";
import { useEffect } from "react";
import AppPagination from "../AppPagination";

const GroupedUser = ({
  role,
  onDelete,
}: {
  role: IRoleWithUser;
  onDelete: () => void;
}) => {
  return (
    <div>
      <>
        <Label className="text-xl mb-3 mt-3">{role.name}</Label>

        <AppTable data={role.users} onDelete={onDelete} />

        <hr className="mt-5 mb-5" />
      </>
    </div>
  );
};

export default function UserList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.user.roles);
  const { data, page, setPage, refetch, last_page } =
    usePaginateTable<IRoleWithUser>("roles", 1, 1);

  const addButtonHandler = () => {
    history.push("/create");
  };

  useEffect(() => {
    dispatch(userActions.setRoles(data));
  }, [data, dispatch]);

  const onChangePageHandler = (pageNumber: number) => {
    if (pageNumber !== page) setPage(pageNumber);
  };

  return (
    <AppCard
      title="User List"
      description="List of users grouped by role"
      action={
        <>
          <Button variant="secondary" size="icon" onClick={addButtonHandler}>
            <PlusIcon />
          </Button>
        </>
      }
    >
      {roles.map((role, roleIndex) => (
        <GroupedUser role={role} key={roleIndex} onDelete={refetch} />
      ))}

      <AppPagination
        lastPage={last_page}
        page={page}
        onChangePage={onChangePageHandler}
      />
    </AppCard>
  );
}
