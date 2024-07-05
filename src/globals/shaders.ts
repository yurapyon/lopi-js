export const shaders = {
  basic3d: {
    vert: `
#version 300 es

layout(location = 0) in vec3 _ext_position;
layout(location = 1) in vec2 _ext_uv;

uniform mat4 _model;
uniform mat4 _view;
uniform mat4 _projection;

out vec2 _uv0;

void main() {
  _uv = _ext_uv;
  gl_Position = _projection * _view * _model * vec4(_ext_position, 1);
}
  `,
    frag: `
#version 300 es
precision highp float;

in vec2 _uv0;

out vec4 _out_color;

void main() {
  _out_color = vec4(1.0f);
}
  `,
  },
} as const;
