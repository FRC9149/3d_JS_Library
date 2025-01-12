# A three.js library create by the frc team 9149
## Either clone this repo, or go to [This site](https://cdn.jsdelivr.net/gh/FRC9149/3d_JS_Library@1.0.0/9149_Rendering.js) to use the library

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
import * as Renderer from "https://cdn.jsdelivr.net/gh/FRC9149/3d_JS_Library@1.0.0/9149_Rendering.js";

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
  pathToObj, 
  width , 
  height,
  cameraPosition, 
  modelPosition, 
  modelScale, 
  spins, 
  rgbColor
)
```


there are 2 required parameters, canvasObject and pathToObj\
canvasObject defines the element that the 3d object should overlay\
pathToObj defines the path to your obj. (excluding the .obj) The only other requirement is that both your .obj and .mtl file have the same name.

width defines the width of the canvas\
height defines the height of the canvas\
camreaPosition defines the 3d starting position of the camera\
modelPosition defines where the model is using the coordinate system XYZ\
modelScale defines the scale of the model using the system XYZ\
spins defines if the model spins without input or not\
rgbColor defines the color of the model using [r, g, b]\

## examples
There is an example page on the example branch of this repository. It shows multiple ways of using this library was well as the different settings.
