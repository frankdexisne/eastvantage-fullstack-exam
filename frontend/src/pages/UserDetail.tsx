import { useEffect, useState } from "react";
import AppCard from "../components/app/AppCard";
import { Button } from "../components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useHistory, useParams } from "react-router-dom";
import type { IUser } from "../store/slices/user";
import { Label } from "../components/ui/label";

import api from "../api";
export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<IUser>();
  const history = useHistory();

  const onCancelHandler = () => {
    history.push("/");
  };

  useEffect(() => {
    if (id) {
      api
        .get<IUser>(`/users/${id}`)
        .then(({ data }) => {
          setUserData(data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <AppCard
      title="User Profile"
      description="View user information"
      action={
        <Button variant="secondary" onClick={onCancelHandler}>
          <ArrowLeftCircleIcon />
        </Button>
      }
    >
      <Label className="mb-2 text-md">Name of User: {userData?.name}</Label>
      <Label className="mb-2 text-md">Email Address: {userData?.email}</Label>
      <div>
        <Label className="mb-2 text-md">Assigned Roles: </Label>
        <ul className="list-disc pl-5">
          {userData?.roles.map((role, roleIndex) => (
            <li key={roleIndex}>{role.name}</li>
          ))}
        </ul>
      </div>
    </AppCard>
  );
}
