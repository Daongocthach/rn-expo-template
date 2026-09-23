export interface LoginProps {
  username: string;
  password: string;
}

export type RegisterProps = {
  username: string;
  last_name: string;
  first_name: string;
  password: string;
  department_id?: number;
  role_id?: number;
  is_leader?: boolean;
  floor_ids?: string[];
};

export interface GetUsersParams {
  page?: number;
  page_size?: number;
  q?: string;
}

export interface UpdateUserPayload {
  username: string;
  first_name: string;
  last_name: string;
  role: number;
}
