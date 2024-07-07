export interface MouseState {
  lastEvent: MouseEvent;
  wrapped: boolean;
  virtualX: number;
  virtualY: number;
}

export namespace MouseState {
  export const createEmpty = (): MouseState => {
    return {
      lastEvent: undefined as unknown as MouseEvent,
      wrapped: false,
      virtualX: 0,
      virtualY: 0,
    };
  };
}
