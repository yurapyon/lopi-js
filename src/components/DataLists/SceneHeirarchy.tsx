import { Component, Index, Match, Show, Switch } from "solid-js";
import { CameraData } from "./3dData/CameraData";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { ISceneObjectData } from "./SceneObjectData/ISceneObjectData";
import { SceneCamera } from "@lib/scene/SceneCamera";
import { Scene } from "@lib/scene/Scene";

export const SceneHeirarchy: Component<{ scene: Scene }> = (props) => {
  const { produceScene } = useLopiStoreContext();
  return (
    <Index each={props.scene.sceneObjects}>
      {(sceneObject) => {
        return (
          <div class="flex flex-col">
            <ISceneObjectData iSceneObject={sceneObject()} />
            <Switch fallback={sceneObject().name}>
              <Match when={sceneObject().type === "camera"}>
                <CameraData
                  camera={(sceneObject() as SceneCamera).camera}
                  onChange={(updateObject) => {
                    produceScene(props.scene.id, (scene) => {
                      const mutableSceneObject = scene.sceneObjects.find(
                        (mutableSceneObject) =>
                          mutableSceneObject.id === sceneObject().id
                      );

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
