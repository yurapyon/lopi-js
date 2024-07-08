import { Component, createSelector } from "solid-js";
import { Button } from "../../general-ui/Button";
import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { Camera } from "@lib/data/scene-objects/Camera";

export const CameraInput: Component<
  {
    camera: Camera;
    onChange: (updateObject: Partial<Camera>) => void;
  } & ClassProps
> = (props_) => {
  const { props, classes } = setupClassProps(props_);
  const isSelectedType = createSelector(() => props.camera.projectionType);

  return (
    <div class="flex flex-col" classList={classes}>
      <div class="flex flex-row">
        <Button
          variant="light"
          onClick={() =>
            props.onChange({
              projectionType: "perspective",
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
              projectionType: "orthographic",
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
