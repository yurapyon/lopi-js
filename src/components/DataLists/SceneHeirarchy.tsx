import { Component, Index, Match, Show, Switch } from "solid-js";
import { CameraData } from "./3dData/CameraData";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { SpatialData } from "./SceneObjectData/SpatialData";
import { SceneCamera } from "@lib/nodes/scene/SceneCamera";
import { Scene } from "@lib/nodes/scene/Scene";
import { SceneObject } from "@lib/nodes/scene/SceneObject";
import { Spatial } from "@lib/nodes/scene/Spatial";

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
            <SpatialData
              spatial={sceneObject()}
              mutateSpatial={(mutateSpatial) => {
                produceSceneObject((mutableSceneObject) => {
                  const spatial = mutableSceneObject as Spatial;
                  mutateSpatial(spatial);
                });
              }}
            />
            <Switch fallback={sceneObject().name}>
              <Match when={sceneObject().type === "camera"}>
                <CameraData
                  camera={(sceneObject() as SceneCamera).camera}
                  onChange={(updateObject) => {
                    produceSceneObject((mutableSceneObject) => {
                      const cameraObject = mutableSceneObject as SceneCamera;
                      cameraObject.camera = {
                        ...cameraObject.camera,
                        ...updateObject,
                      };
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
