import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { getPermissions } from "./getPermissionAndRole";

// Hook to get the current logged-in user
const useGetUser = () => {
    const user = useAppSelector(currentUser);
    return user;
};

// Hook to check if user has a specific permission
const useHasPermission = (permissionToCheck: string): boolean => {
    const user = useGetUser();
    if (!user) return false;

    const { permissions } = getPermissions(user);
    return permissions.includes(permissionToCheck);
};

export { useGetUser, useHasPermission };