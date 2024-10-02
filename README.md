# A three.js library create by the frc team 9149
## Either clone this repo, or go to `[test](https://cdn.jsdelivr.net/gh/FRC9149/3d_JS_Library@main/9149_Rendering2.js)` to use the library

## Setting up your html file
In your html file, add this element before your script.
```
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js",
      "addons": "https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/"
    }
  }
</script>
```
This will allow for the library to acess it's dependencies.
```
<!Make sure to give your script a type of module so that you can import the library.>
<script type="module" src="your_script.js"></script>
```

## Importing the library

Inside your js file, you need to reference the library.

```
// Using jsdelivr
import * as Renderer from "(https://cdn.jsdelivr.net/gh/FRC9149/3d_JS_Library@main/9149_Rendering2.js)";

//using a download
import * as Renderer from "/9149_Rendering.js";
```

You can also Write this with a direct import
```
import { create3dObject } from ...
```

## using the library

Inside 9149_Rendering, there is 1 function.
```
function create3dObject(
  canvasObject, 
  pathToObj = "", 
  width = window.innerWidth, 
  height = window.innerHeight, 
  is_rotateable = false, 
  cameraPosition = [0, 0, 0],
  spins = true, 
  shadows = true, 
  alpha = true
)
```


there are 2 required parameters, canvasObject and pathToObj\
canvasObject defines the element that the 3d object should overlay\
pathToObj defines the path to your obj. (excluding the .obj) The only other requirement is that both your .obj and .mtl file have the same name.

width defines the width of the canvas\
height defines the height of the canvas\
is_rotateable defines if you can drag the model around or rotate it\
camreaPosition defines the 3d starting position of the camera\
spins defines if the model spins without input or not\
shadows defines if the lights cast shadows\
alpha defines if the background is solid black or transparent\

## examples
There is an example page on the example branch of this repository. It shows multiple ways of using this library was well as the different settings.
