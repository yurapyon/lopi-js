import { Component, createSelector } from "solid-js";
import { Button } from "../../general-ui/Button";
import { Camera } from "@lib/data/3d/Camera";
import { ClassProps, setupClassProps } from "@utils/ClassProps";

export const CameraInput: Component<
  {
    camera: Camera;
    onChange: (updateObject: Partial<Camera>) => void;
  } & ClassProps
> = (props_) => {
  const { props, classes } = setupClassProps(props_);
  const isSelectedType = createSelector(() => props.camera.type);

  return (
    <div class="flex flex-col" classList={classes}>
      <div class="flex flex-row">
        <Button
          variant="light"
          onClick={() =>
            props.onChange({
              type: "perspective",
            })
          }
          selected={isSelectedType("perspective")}
        >
          perspective
        </Button>
        <Button
          variant="light"
          onClick={() =>
            props.onChange({
              type: "orthographic",
            })
          }
          selected={isSelectedType("orthographic")}
        >
          orthographic
        </Button>
      </div>
      <div>
        {
          // TODO slider or something
          props.camera.fovDegrees
        }
      </div>
    </div>
  );
};
