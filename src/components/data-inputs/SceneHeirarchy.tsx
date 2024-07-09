import { Component, Index, Match, Show, Switch } from "solid-js";
import { CameraInput } from "./scene-objects/CameraInput";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { Scene } from "@lib/data/Scene";
import { SceneObject } from "@lib/data/scene-objects/SceneObject";
import { SpatialInput } from "./scene-objects/SpatialInput";
import { SceneCamera } from "@lib/data/scene-objects/SceneCamera";

export const SceneHeirarchy: Component<{ scene: Scene }> = (props) => {
  const { produceScene } = useLopiStoreContext();

  return (
    <Index each={props.scene.sceneObjects}>
      {(sceneObject) => {
        const mutateSceneObject = (
          mutateFn: (sceneObject: SceneObject) => void
        ) => {
          produceScene(props.scene.id, (scene) => {
            const mutableSceneObject = scene.sceneObjects.find(
              (mutableSceneObject) => mutableSceneObject.id === sceneObject().id
            )!;
            mutateFn(mutableSceneObject);
          });
        };

        return (
          <div class="flex flex-col">
            <SpatialInput
              spatial={sceneObject().spatial}
              mutateSpatial={(mutateSpatial) => {
                mutateSceneObject((sceneObject) => {
                  mutateSpatial(sceneObject.spatial);
                });
              }}
            />
            <Switch fallback={sceneObject().name}>
              <Match when={sceneObject().type === "camera"}>
                <CameraInput
                  camera={(sceneObject() as SceneCamera).data}
                  mutateCamera={(mutateCamera) => {
                    mutateSceneObject((sceneObject) => {
                      mutateCamera((sceneObject as SceneCamera).data);
                    });
                  }}
                />
              </Match>
            </Switch>
          </div>
        );
      }}
    </Index>
  );
};
