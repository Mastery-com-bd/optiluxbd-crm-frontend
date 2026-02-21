// Interfaces based on the JSON
export interface Role {
    id: number;
    userId: number;
    roleId: number;
    role: {
        id: number;
        name: string;
        description: string;
    };
}

export interface User {
    id: number;
    userId: string;
    name: string;
    email: string;
    phone: string | null;
    roles: Role[];
    status: string;
    is_active: boolean;
    email_verified: boolean;
    phone_verified: boolean;
    avatar_secure_url: string | null;
    created_at: string;
    updated_at: string;
    last_login: string | null;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface AllUsersProps {
    success: boolean;
    message: string;
    data: User[];
    pagination: Pagination;
}


export interface Permission {
    id: number;
    key: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface RolePermission {
    id: number;
    roleId: number;
    permissionId: number;
    created_at: string;
    permission: Permission;
}

export interface RoleUser {
    id: number;
    userId: number;
    roleId: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export interface Role {
    id: number;
    organizationId: number;
    name: string;
    description: string;
    isSystemRole: boolean;
    created_at: string;
    updated_at: string;
    permissions: RolePermission[];
    users: RoleUser[];
}

export interface RolesResponse {
    success: boolean;
    message: string;
    data: Role[];
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        userId: string;
        name: string;
        email: string;
        phone: string | null;
        roles: {
            id: number;
            userId: number;
            roleId: number;
            role: {
                id: number;
                name: string;
                description: string;
            };
        }[];
        is_active: boolean;
        avatar_public_id: string | null;
        avatar_secure_url: string | null;
        created_at: string;
        updated_at: string;
        last_login: string | null;
    };
}
