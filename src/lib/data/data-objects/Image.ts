export interface Image {
  filepath: string;
  data: Uint8Array;
  runtime: {
    texture: WebGLTexture;
  };
}
