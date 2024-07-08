import { Component, Index, Match, Show, Switch } from "solid-js";
import { CameraInput } from "./3d/CameraInput";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { SpatialInput } from "./nodes/scene/SpatialInput";
import { Scene } from "@lib/data/scene-objects/Scene";
import { SceneCamera, SceneObject } from "@lib/data/scene-objects/SceneObject";

export const SceneHeirarchy: Component<{ scene: Scene }> = (props) => {
  const { produceScene } = useLopiStoreContext();

  return (
    <Index each={props.scene.sceneObjects}>
      {(sceneObject) => {
        const produceSceneObject = (
          withSceneObject: (mutableSceneObject: SceneObject) => void
        ) => {
          produceScene(props.scene.id, (scene) => {
            const mutableSceneObject = scene.sceneObjects.find(
              (mutableSceneObject) => mutableSceneObject.id === sceneObject().id
            )!;
            withSceneObject(mutableSceneObject);
          });
        };

        return (
          <div class="flex flex-col">
            <SpatialInput
              spatial={sceneObject().spatial}
              mutateSpatial={(mutateSpatial) => {
                produceSceneObject((mutableSceneObject) => {
                  mutateSpatial(mutableSceneObject.spatial);
                  if (mutableSceneObject.type === "camera") {
                    // mutableSceneObject.runtime.viewMatrix
                  }
                });
              }}
            />
            <Switch fallback={sceneObject().name}>
              <Match when={sceneObject().type === "camera"}>
                <CameraInput
                  camera={(sceneObject() as SceneCamera).data}
                  onChange={(updateObject) => {
                    produceSceneObject((mutableSceneObject) => {
                      const cameraObject = mutableSceneObject as SceneCamera;
                      cameraObject.data = {
                        ...cameraObject.data,
                        ...updateObject,
                      };
                      // cameraObject.runtime.projectionMatrix
                      // cameraObject.runtime.viewMatrix
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
