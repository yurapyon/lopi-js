import {
  Accessor,
  ParentComponent,
  Setter,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

interface InteractionState {
  selectedToolId: Accessor<string | null>;
  setSelectedToolId: Setter<string | null>;
  selectedViewId: Accessor<string | null>;
  setSelectedViewId: Setter<string | null>;
}

const InteractionStateContext = createContext<InteractionState>();

export const useInteractionStateContext = () => {
  const interactionStateContext = useContext(InteractionStateContext);
  if (!interactionStateContext) {
    throw "error";
  }
  return interactionStateContext;
};

export const InteractionStateProvider: ParentComponent = (props) => {
  const [selectedToolId, setSelectedToolId] = createSignal<string | null>(null);
  const [selectedViewId, setSelectedViewId] = createSignal<string | null>(null);

  const interactionStateContext = {
    selectedToolId,
    setSelectedToolId,
    selectedViewId,
    setSelectedViewId,
  };
  return (
    <InteractionStateContext.Provider value={interactionStateContext}>
      {props.children}
    </InteractionStateContext.Provider>
  );
};
