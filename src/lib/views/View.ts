export interface Workspace {
  id: string;
  name: string;
  viewIds: string[];
  isSplit: boolean;
}

export interface View {
  id: string;
  editorId: string;
}
