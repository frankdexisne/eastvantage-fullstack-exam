import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../../components/ui/table";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { IUser } from "../../store/slices/user";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api";
import { userActions } from "../../store/slices/user";
import { useDispatch } from "react-redux";
export interface ITableData {
  header: string;
  field: string;
}

interface IAppTableProps {
  data: IUser[];
  onDelete: () => void;
}

export default function AppTable({ data, onDelete }: IAppTableProps) {
  const history = useHistory();
  const dispatch = useDispatch();

  const editButtonHandler = (id: number) => {
    history.push(`/update/${id}`);
  };

  const deleteButtonHandler = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/users/${id}`).then(() => {
          dispatch(userActions.delete(id));
          onDelete();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user, userIndex) => (
          <TableRow key={userIndex}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right space-x-1">
              <Button
                variant="secondary"
                size="icon"
                className="size-8 bg-blue-500 hover:bg-blue-700 text-white"
                onClick={() => editButtonHandler(user.id)}
              >
                <PencilIcon />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="size-8 bg-red-500 hover:bg-red-700 text-white"
                onClick={() => deleteButtonHandler(user.id)}
              >
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
