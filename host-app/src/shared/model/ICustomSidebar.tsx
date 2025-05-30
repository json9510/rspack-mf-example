export interface ICustomSidebar {
  url?: string;
  icon: React.JSX.Element;
  title: string;
  children?: ICustomSidebar[];
}
