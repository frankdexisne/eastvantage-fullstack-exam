import AppCard from "../components/app/AppCard";
import { Button } from "../components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useHistory } from "react-router-dom";
import UserForm from "../components/app/users/UserForm";
import type { IUser } from "../store/slices/user";

export default function Create() {
  const history = useHistory();

  const onSuccessHandler = (user: IUser) => {
    history.push(`/user/${user.id}`);
  };

  const onCancelHandler = () => {
    history.push("/");
  };

  return (
    <AppCard
      title="Create User"
      description="Fill up the user information"
      action={
        <Button variant="secondary" onClick={onCancelHandler}>
          <ArrowLeftCircleIcon />
        </Button>
      }
    >
      <UserForm onSuccess={onSuccessHandler} onCancel={onCancelHandler} />
    </AppCard>
  );
}
