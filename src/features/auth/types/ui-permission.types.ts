export interface UiPermissions {
  full_access: boolean;
  can_access_account_settings: boolean;
  can_setting_access_control: boolean;
  can_setting_shift_schedule: boolean;
  can_access_device_library: boolean;
  can_access_layout_views: boolean;
  can_access_checklist_manager: boolean;
  can_access_checklist_history: boolean;
  can_setting_off_date: boolean;
  can_access_requesting_department_repair_forms: boolean;
  can_access_responsible_department_repair_forms: boolean;
  can_access_analytics: boolean;
  can_create_repair_form: boolean;
  can_accept_pending_repair_form: boolean;
  can_confirm_repair_form: boolean;
  can_edit_checklist_history: boolean;
  can_create_downtime_status_record: boolean;
  can_access_worker_checklist: boolean;
  can_configure_packing_layout: boolean;
  can_configure_packing_rule: boolean;
  can_view_qc_packing: boolean;
  can_edit_inspection_form: boolean;
  can_switch_company: boolean;
  is_department_leader: boolean;
}
