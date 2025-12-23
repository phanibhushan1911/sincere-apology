
export interface PromiseAction {
  id: string;
  title: string;
  description: string;
  category: 'communication' | 'growth' | 'respect';
}

export interface SiteState {
  hasConsented: boolean;
  showClosingButtons: boolean;
}
