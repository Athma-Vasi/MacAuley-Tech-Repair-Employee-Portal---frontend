type Action = 'company' | 'general' | 'outreach';

type ActionsGeneral =
  | 'endorsement'
  | 'printer issue'
  | 'anonymous request'
  | 'referment';

type ActionsCompany =
  | 'address change'
  | 'expense claim'
  | 'request resource'
  | 'parental leave';

type ActionsOutreach = 'Survey builder' | 'Event creator';

export type { Action, ActionsCompany, ActionsGeneral, ActionsOutreach };
