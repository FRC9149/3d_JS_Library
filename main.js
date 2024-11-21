import * as Renderer from "https://cdn.jsdelivr.net/gh/FRC9149/3d_JS_Library@example/9149_Rendering2.js";

Renderer.create3dObject(
  document.getElementById("contained3d"),
  "/models/cali",
  400,
  500,
  true,
  [0, 29, 25],
  true
)
