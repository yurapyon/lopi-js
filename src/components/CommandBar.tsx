import { Component, Show, createEffect, createSignal } from "solid-js";
import { Button } from "./general-ui/Button";

export const CommandBar: Component<{
  enteringCommand: boolean;
  setEnteringCommand: (enteringCommand: boolean) => void;
  executeCommand: (command: string) => void;
}> = (props) => {
  const [tempCommand, setTempCommand] = createSignal("");

  let inputBox!: HTMLInputElement;

  createEffect(() => {
    if (props.enteringCommand) {
      inputBox.focus();
    } else {
      setTempCommand("");
    }
  });

  return (
    <div
      class="flex flex-row items-center w-full"
      classList={{
        "bg-lopi-blue-dark": props.enteringCommand,
        "bg-lopi-grey-light": !props.enteringCommand,
      }}
    >
      <button
        class="px-[1ch]"
        classList={{
          "bg-lopi-blue hover:bg-lopi-blue-mid": props.enteringCommand,
          "bg-lopi-grey-light hover:bg-lopi-grey-extra-light":
            !props.enteringCommand,
        }}
        onClick={() => {
          props.setEnteringCommand(!props.enteringCommand);
        }}
      >
        :
      </button>
      <Show when={props.enteringCommand}>
        <input
          ref={inputBox}
          class="px-2 w-full h-full bg-transparent outline-none"
          type="text"
          value={tempCommand()}
          onInput={(e) => {
            setTempCommand(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.executeCommand(tempCommand());
              props.setEnteringCommand(false);
            }
          }}
        />
      </Show>
    </div>
  );
};
