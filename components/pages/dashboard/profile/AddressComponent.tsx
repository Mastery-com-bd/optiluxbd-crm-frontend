"use client";

import { IProfileInfo } from "@/types/user/userProfileType";
import CreateAddressComponent from "./CreateAddressComponent";
import { IAddress } from "@/types/address.types";
import EditAddressComponent from "./EditAddressComponent";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateAddressByAdmin from "../admin/manageUsers/singleUSer/CreateAddressByAdmin";

type TAddressComponentProps = {
  userInfo: IProfileInfo;
  userFor?: string;
};

const AddressComponent = ({ userInfo, userFor }: TAddressComponentProps) => {
  const addresses = (userInfo?.addresses as IAddress[]) || [];
  const [createEditing, setCreateEditing] = useState(false);

  return (
    <div className="space-y-2">
      {addresses.length > 0 && !createEditing ? (
        <div className="space-y-2">
          {addresses.length < 4 && !createEditing && (
            <div className="flex items-center justify-end">
              <Button
                type="submit"
                onClick={() => setCreateEditing(true)}
                className=" bg-yellow-500 dark:bg-yellow-600 hover:bg-[#ffc500] dark:hover:bg-yellow-500 text-white cursor-pointer"
              >
                Create Address
              </Button>
            </div>
          )}
          {addresses.map((address: IAddress) => (
            <div
              key={address.id}
              className="relative rounded-xl border bg-white dark:bg-gray-900 shadow-sm p-6"
            >
              <EditAddressComponent address={address} />
            </div>
          ))}
        </div>
      ) : (
        <>
          {userFor ? (
            <CreateAddressByAdmin
              setCreateEditing={setCreateEditing}
              id={userInfo?.id}
            />
          ) : (
            <CreateAddressComponent setCreateEditing={setCreateEditing} />
          )}
        </>
      )}
    </div>
  );
};

export default AddressComponent;
