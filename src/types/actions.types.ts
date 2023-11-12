type Action = 'company' | 'general' | 'outreach' | 'dashboard';

type ActionsGeneral =
  | 'endorsement'
  | 'printer issue'
  | 'anonymous request'
  | 'referment';

type ActionsCompany =
  | 'address change'
  | 'expense claim'
  | 'request resource'
  | 'leave request'
  | 'benefits';

type ActionsOutreach = 'survey' | 'event' | 'announcement';

type ActionsDashboard = 'product' | 'transaction' | 'customer';

export type {
  Action,
  ActionsCompany,
  ActionsGeneral,
  ActionsOutreach,
  ActionsDashboard,
};
