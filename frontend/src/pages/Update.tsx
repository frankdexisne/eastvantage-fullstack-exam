import AppCard from "../components/app/AppCard";
import { Button } from "../components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useHistory, useParams } from "react-router-dom";
import UserForm from "../components/app/users/UserForm";

export default function Update() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const onSuccessHandler = () => {
    history.push("/");
  };

  const onCancelHandler = () => {
    history.push("/");
  };

  return (
    <AppCard
      title="Update User"
      description="Change the user information"
      action={
        <Button variant="secondary" onClick={onCancelHandler}>
          <ArrowLeftCircleIcon />
        </Button>
      }
    >
      <UserForm
        onSuccess={onSuccessHandler}
        onCancel={onCancelHandler}
        updateId={+id}
      />
    </AppCard>
  );
}
