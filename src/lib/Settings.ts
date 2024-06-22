export interface Settings {
  commandBarAlwaysOpen: boolean;
}

export namespace Settings {
  export const createDefault = (): Settings => {
    return {
      commandBarAlwaysOpen: false,
    };
  };
}
