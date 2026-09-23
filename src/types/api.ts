export interface PaginationMeta {
  total_items: number;
  page_size: number;
  current_page: number;
  total_pages: number;
  next_page: string | null;
  previous_page: string | null;
}

export interface ListResponse<T> {
  status: boolean;
  data: T;
  pagination: PaginationMeta;
}

export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data: T;
}
