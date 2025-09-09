import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import api from "../../../api";
import type { IUser } from "../../../store/slices/user";
import { userActions } from "../../../store/slices/user";
import { useDispatch } from "react-redux";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import type { IOptionType } from "../../../store/slices/select";
import { selectActions } from "../../../store/slices/select";
import FormInput from "../controls/FormInput";
import FormSelect from "../controls/FormSelect";

interface ISelectApiResponse {
  data: IOptionType[];
}

export interface IUserFormData {
  name: string;
  email: string;
  roles: IOptionType[];
}

interface IUserFom {
  onSuccess: (user: IUser) => void;
  onCancel: () => void;
  updateId?: number;
}

interface ApiValidationError {
  response: {
    data: {
      errors: {
        [field: string]: string[];
      };
      message: string;
    };
  };
}

export default function UserForm({ onSuccess, onCancel, updateId }: IUserFom) {
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.select.roles);
  const { handleSubmit, setError, control, setValue } =
    useForm<IUserFormData>();

  const catchHandler = (error: AxiosError<ApiValidationError>) => {
    if (error.status === 422) {
      Object.entries(error.response.data.errors).forEach(
        ([field, messages]) => {
          setError(field as keyof IUserFormData, {
            type: "server",
            message: (messages as string[])[0],
          });
        }
      );
    }
  };

  const submitUserHandler = (formData: IUserFormData) => {
    const { roles, ...rest } = formData;
    const transformedFormData = {
      ...rest,
      role_ids: roles.map((role) => role.value),
    };

    if (updateId) {
      api
        .put<IUser>(`/users/${updateId}`, transformedFormData)
        .then(({ data }) => {
          dispatch(userActions.update({ id: updateId, userData: formData }));
          onSuccess(data);
        })
        .catch(catchHandler);
    } else {
      api
        .post<IUser>("/users", transformedFormData)
        .then(({ data }) => {
          dispatch(userActions.create(data));
          onSuccess(data);
        })
        .catch(catchHandler);
    }
  };

  useEffect(() => {
    api.get<ISelectApiResponse>("/selects/roles").then((response) => {
      dispatch(selectActions.setRoles(response.data));
    });
  }, [dispatch]);

  useEffect(() => {
    if (updateId) {
      api
        .get<IUser>(`/users/${updateId}`)
        .then(({ data }) => {
          for (const [key, value] of Object.entries(data).filter(([key]) =>
            ["name", "email", "roles"].includes(key)
          )) {
            if (key !== "roles") {
              setValue(key as keyof IUserFormData, value);
            } else {
              const roles = data.roles.map(
                (role: { id: number; name: string }) => ({
                  value: role.id,
                  label: role.name,
                })
              );
              setValue("roles", roles);
            }
          }
        })
        .catch((error) => console.error(error));
    }
  }, [updateId, setValue]);

  return (
    <form onSubmit={handleSubmit(submitUserHandler)}>
      <FormInput
        label="Email"
        name="email"
        control={control}
        rules={{ required: { value: true, message: "Email is required" } }}
      />

      <FormInput
        label="Fullname"
        name="name"
        control={control}
        rules={{ required: { value: true, message: "Fullname is required" } }}
      />

      <FormSelect
        label="Roles"
        name="roles"
        options={roles}
        control={control}
        isMulti
        rules={{
          required: {
            value: true,
            message: "Role(s) is required",
          },
        }}
      />

      <div className="w-full flex gap-2">
        <div className="w-[50%]">
          <Button type="submit" className="mt-4 w-full bg-green-600">
            Submit
          </Button>
        </div>
        <div className="w-[50%]">
          <Button
            type="button"
            onClick={onCancel}
            className="mt-4 w-full bg-gray-600"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
