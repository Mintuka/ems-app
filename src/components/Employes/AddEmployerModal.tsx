import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import fetchGuests from "@/lib/frontend/fetchGuests";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { ProfileForm } from "./FormCreateEmploye";

type Props = {
  trigger: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};
function AddEmployerModal({ trigger,setModal }: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users = useQuery({
    queryKey: ["guests"],
    queryFn: async () => fetchGuests(),
    enabled: trigger,
  });

  useEffect(() => {
    if (trigger === false) {
      setSelectedUser(null);
    }
  }, [trigger]);
  return (
    <SheetContent className="bg-base-100 overflow-y-scroll">
      <SheetHeader>
        <SheetTitle>Create an Employee</SheetTitle>
        <SheetDescription>
          Fill in the form below to create a new employee.
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col mt-10 gap-7">
        {users.data && (
          <>
            {/* <select
            onChange={(e) => {
              if (e.target.value === "Select a user") {
                setSelectedUser(null);
                return;
              }
              if (!users.data) {
                return;
              }
              setSelectedUser(users.data[parseInt(e.target.value)]);
            }}
          >
            <option>Select a user</option>
            {users.data.map((user, index) => {
              return (
                <option key={user.id} value={index}>
                  {`${user.firstName} ${user.lastName} ${user.email}}`}
                </option>
              );
            })}
          </select> */}
            <Select
              onValueChange={(value) => {
                if (!users.data) {
                  return;
                }
                setSelectedUser(users.data[parseInt(value)]);
              }}
            >
              <SelectTrigger className="bg-base-100 text-primary">
                <SelectValue placeholder="Select User to Add" />
              </SelectTrigger>
              <SelectContent className="bg-base-100 text-primary">
                {users.data.map((user, index) => {
                  return (
                    <SelectItem key={user.id} value={index.toString()}>
                      {`${user.firstName} ${user.lastName} ${user.email}`}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </>
        )}
        {selectedUser && (
          // <form>
          //   <input type="text" value={selectedUser.firstName!} />
          //   <input type="text" value={selectedUser.lastName!} />
          //   <input type="text" value={selectedUser.email!} />
          //   <input type="text" /> {/* phone */}
          //   <input type="text" /> {/* role */}
          //   <input type="text" /> {/* salary */}
          //   <input type="text" /> {/* Bank Account IBAN */}
          //   <input type="text" /> {/* Position */}
          //   <input type="text" /> {/* taxId  */}
          //   <input type="text" /> {/* Address */}
          //   <input type="text" /> {/* Insurance */}
          //   <input type="text" /> {/* onBoarding */}
          // </form>
          <>
            <ProfileForm
              firstName={selectedUser.firstName!}
              lastName={selectedUser.lastName!}
              email={selectedUser.email!}
              id={selectedUser.id}
              image={selectedUser.image_url}
              setModal={setModal}
            />
          </>
        )}
      </div>
    </SheetContent>
  );
}
export default AddEmployerModal;
