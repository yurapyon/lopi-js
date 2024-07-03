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
  selectedEditorId: Accessor<string | null>;
  setSelectedEditorId: Setter<string | null>;
  selectedSceneObjectIds: Accessor<string[]>;
  setSelectedSceneObjectIds: Setter<string[]>;
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
  const [selectedEditorId, setSelectedEditorId] = createSignal<string | null>(
    null
  );
  const [selectedSceneObjectIds, setSelectedSceneObjectIds] = createSignal<
    string[]
  >([]);

  const interactionStateContext = {
    selectedToolId,
    setSelectedToolId,
    selectedEditorId,
    setSelectedEditorId,
    selectedSceneObjectIds,
    setSelectedSceneObjectIds,
  };
  return (
    <InteractionStateContext.Provider value={interactionStateContext}>
      {props.children}
    </InteractionStateContext.Provider>
  );
};
