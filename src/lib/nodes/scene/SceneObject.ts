import { SceneRoot } from "./SceneRoot";
import { SceneEmpty } from "./SceneEmpty";
import { SceneMesh, SceneSkinnedMesh } from "./SceneMesh";
import { SceneCamera } from "./SceneCamera";

export type SceneObject =
  | SceneRoot
  | SceneEmpty
  | SceneMesh
  | SceneSkinnedMesh
  | SceneCamera;

export type SceneObjectType = SceneObject["type"];
