import {
  Component,
  Index,
  Show,
  createEffect,
  createSelector,
  createSignal,
} from "solid-js";
import { Button } from "./general-ui/Button";
import { LopiLogo } from "./LopiLogo";

interface MenuAction {
  name: string;
  action: () => void;
}

interface MenuItem {
  name: string;
  actions: MenuAction[];
}

export const MenuBar: Component<{ openAboutMenu: () => void }> = (props) => {
  const menus = ["File", "Edit", "Window"];

  const [currentlyOpenMenuIdx, setCurrentlyOpenMenuIdx] = createSignal<
    number | null
  >(null);
  const isSelected = createSelector(currentlyOpenMenuIdx);

  return (
    <div class="flex flex-row bg-lopi-grey-light">
      <div class="flex flex-row">
        <Index each={menus}>
          {(item, i) => {
            return (
              <div class="relative">
                <Button
                  class="px-[1ch]"
                  variant="light"
                  onClick={() => setCurrentlyOpenMenuIdx(i)}
                  selected={isSelected(i)}
                >
                  {item()}
                </Button>
                <Show when={isSelected(i)}>
                  <div class="absolute bottom-full left-0 min-w-full bg-lopi-grey-light">
                    asdf
                  </div>
                </Show>
              </div>
            );
          }}
        </Index>
      </div>
      <div class="grow min-w-0" />
      <button class="hover:text-lopi-blue" onClick={props.openAboutMenu}>
        <LopiLogo class="h-[1.5em]" />
      </button>
    </div>
  );
};
