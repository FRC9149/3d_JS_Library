import * as Renderer from "https://cdn.jsdelivr.net/gh/FRC9149/3d_JS_Library@1.0.0/9149_Rendering.js";

    Renderer.create3dObject(
      document.getElementById("contained3d"), // container
      "/models/cali", // destination to file
      900, // width
      600, // height
      [0, -5, 5], // camera pos (affects rotation for some reason)
      [0, 0, -1], // position of the model
      [0.01, 0.01, 0.01], // scale of the model
      true, // should the model spin
      [1, 1, 1] // color of the model
    );