
# Globe Textures

This directory contains texture files for the 3D globe visualization:

- earth_daymap.jpg - Earth diffuse texture map (day view)
- earth_bump.jpg - Earth bump/height map for surface details
- earth_specular.jpg - Earth specular highlight map
- earth_normal.jpg - Earth normal map for surface details
- earth_clouds.jpg - Cloud layer texture

These textures are used by the Earth component in src/components/globe/Earth.tsx.

## Adding Your Own Textures
Replace the placeholder files with actual texture images while keeping the same names. For best results:
- earth_daymap.jpg should be a color map of the Earth
- earth_bump.jpg should be a grayscale height map
- earth_specular.jpg should highlight reflective areas
- earth_normal.jpg should represent surface normal directions 
- earth_clouds.jpg should be a transparent cloud layer

## Finding Textures
You can find free Earth textures at:
- https://www.solarsystemscope.com/textures/
- https://visibleearth.nasa.gov/collection/1484/blue-marble

Download the textures and place them in this directory to see the full 3D Earth visualization.
