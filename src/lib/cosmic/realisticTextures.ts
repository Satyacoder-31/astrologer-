import * as THREE from 'three';

// Cache for loaded textures to prevent duplicate memory allocations
const textureCache: Record<string, THREE.Texture> = {};
const textureLoader = new THREE.TextureLoader();

/**
 * Loads high-resolution NASA equirectangular planetary texture maps
 * (from /textures/planets/ local folder) with SRGB color space.
 */
export function getNasaPlanetTexture(name: string): THREE.Texture {
  const key = `nasa_${name}`;
  if (textureCache[key]) return textureCache[key];

  const ext = name.includes('ring') || name.includes('clouds') || name.includes('lights') ? 'png' : 'jpg';
  const path = `/textures/planets/${name}.${ext}`;
  const texture = textureLoader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16; // 16x anisotropic filtering for razor-sharp clarity
  textureCache[key] = texture;
  return texture;
}

/**
 * Creates a soft, photorealistic radial starlight sprite with exponential falloff.
 */
export function getStarTexture(): THREE.CanvasTexture {
  if (textureCache['star_soft']) return textureCache['star_soft'] as THREE.CanvasTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = 32;
  const cy = 32;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.15, 'rgba(255, 255, 255, 0.9)');
  grad.addColorStop(0.35, 'rgba(220, 235, 255, 0.4)');
  grad.addColorStop(0.65, 'rgba(180, 210, 255, 0.12)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const tex = new THREE.CanvasTexture(canvas);
  textureCache['star_soft'] = tex;
  return tex;
}

/**
 * Creates a brilliant optical star sprite with 4-point diffraction spikes.
 */
export function getBrightStarTexture(): THREE.CanvasTexture {
  if (textureCache['star_bright']) return textureCache['star_bright'] as THREE.CanvasTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const cx = 64;
  const cy = 64;

  const hGrad = ctx.createLinearGradient(0, cy, 128, cy);
  hGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  hGrad.addColorStop(0.42, 'rgba(255, 255, 255, 0.2)');
  hGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  hGrad.addColorStop(0.58, 'rgba(255, 255, 255, 0.2)');
  hGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = hGrad;
  ctx.fillRect(0, cy - 1, 128, 2);

  const vGrad = ctx.createLinearGradient(cx, 0, cx, 128);
  vGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  vGrad.addColorStop(0.42, 'rgba(255, 255, 255, 0.2)');
  vGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  vGrad.addColorStop(0.58, 'rgba(255, 255, 255, 0.2)');
  vGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(cx - 1, 0, 2, 128);

  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 45);
  coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  coreGrad.addColorStop(0.15, 'rgba(255, 248, 235, 0.85)');
  coreGrad.addColorStop(0.35, 'rgba(212, 175, 98, 0.4)');
  coreGrad.addColorStop(0.7, 'rgba(81, 59, 131, 0.1)');
  coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 45, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  textureCache['star_bright'] = tex;
  return tex;
}

/**
 * Creates custom GPU Blinking Star Shader Material.
 */
export function createBlinkingStarsMaterial(starTexture: THREE.Texture): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: starTexture },
    },
    vertexShader: `
      uniform float uTime;
      attribute float aTwinklePhase;
      attribute float aTwinkleSpeed;
      attribute float aSize;
      attribute vec3 aColor;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = aColor;
        float blink = sin(uTime * aTwinkleSpeed + aTwinklePhase);
        float intensity = 0.25 + 0.75 * pow(max(0.0, 0.5 + 0.5 * blink), 2.2);
        vAlpha = intensity;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (0.8 + 0.4 * intensity) * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec4 tex = texture2D(uTexture, gl_PointCoord);
        if (tex.a < 0.05) discard;
        gl_FragColor = vec4(vColor, vAlpha * tex.a);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

/**
 * Atmospheric Fresnel Rim Glow (Rayleigh scattering)
 */
export function createAtmosphericGlow(
  radius: number,
  glowColor: number,
  intensity: number = 0.35
): THREE.Mesh {
  const geom = new THREE.SphereGeometry(radius * 1.035, 64, 64);
  const mat = new THREE.MeshBasicMaterial({
    color: glowColor,
    transparent: true,
    opacity: intensity,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  });
  return new THREE.Mesh(geom, mat);
}

/**
 * NASA Earth Day/Night Shader Material
 * Renders daytime continents/oceans, dark night with glowing city lights,
 * atmospheric clouds, and twilight terminator.
 */
export function createNasaEarthMaterial(): THREE.ShaderMaterial {
  const dayMap = getNasaPlanetTexture('earth_day');
  const nightMap = getNasaPlanetTexture('earth_night');
  const cloudsMap = getNasaPlanetTexture('earth_clouds');

  return new THREE.ShaderMaterial({
    uniforms: {
      uDayMap: { value: dayMap },
      uNightMap: { value: nightMap },
      uCloudsMap: { value: cloudsMap },
      uSunDirection: { value: new THREE.Vector3(1.0, 0.25, 0.6).normalize() },
      uCloudsOffset: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uDayMap;
      uniform sampler2D uNightMap;
      uniform sampler2D uCloudsMap;
      uniform vec3 uSunDirection;
      uniform float uCloudsOffset;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        // High-precision normal and solar vectors in view space
        vec3 N = normalize(vNormal);
        vec3 L = normalize(uSunDirection);
        vec3 V = normalize(-vPosition);

        // Lambertian solar dot product for true 3D day/night illumination
        float NdotL = dot(N, L);

        // Day and Night illumination factors
        float dayFactor = smoothstep(-0.04, 0.22, NdotL);
        float nightFactor = 1.0 - smoothstep(-0.08, 0.08, NdotL);

        // Sample 2K NASA Blue Marble daylight surface map (2048x1024)
        vec3 dayColor = texture2D(uDayMap, vUv).rgb;

        // Sample 4K NASA Black Marble nighttime city lights map (4096x2048)
        vec3 nightColor = texture2D(uNightMap, vUv).rgb;

        // Sample NASA Cloud deck with offset
        vec2 cloudUv = vec2(fract(vUv.x + uCloudsOffset), vUv.y);
        vec4 cloudColor = texture2D(uCloudsMap, cloudUv);

        // Vibrant NASA Black Marble golden city night lights with high contrast
        // Pitch black oceans, brilliant amber city grids
        vec3 cityLights = pow(nightColor, vec3(1.2)) * vec3(1.5, 1.3, 0.85) * nightFactor * 3.6;

        // Ocean specular glint where the sun shines on water
        float ocean = clamp((dayColor.b - (dayColor.r + dayColor.g) * 0.45) * 2.8, 0.0, 1.0);
        vec3 H = normalize(L + V);
        float spec = pow(max(0.0, dot(N, H)), 48.0) * ocean * dayFactor * 0.55;

        // Day surface with clouds catching sunlight and true 3D light shading
        vec3 daySurface = mix(dayColor, vec3(1.0), cloudColor.r * 0.72) * max(0.02, NdotL) + vec3(spec);

        // Subtle twilight warmth along the terminator
        float twilight = smoothstep(0.18, 0.0, abs(NdotL)) * 0.18;
        vec3 twilightColor = vec3(0.95, 0.45, 0.15) * twilight;

        // Final color: pure 3D sphere with ZERO artificial border, 100% sharp edges!
        vec3 finalColor = mix(cityLights, daySurface, dayFactor) + twilightColor;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
  });
}

/**
 * Creates complete NASA Earth 3D Group:
 * - Earth sphere with Day/Night & City Lights shader (2K Blue Marble & 4K Black Marble)
 * - Translucent cloud layer tightly hugging surface
 * - 100% SHARP silhouette edges against black space (Zero borders or halos!)
 */
export function createNasaEarthGroup(radius: number = 7.5): {
  group: THREE.Group;
  earthMesh: THREE.Mesh;
  cloudsMesh: THREE.Mesh;
  earthMat: THREE.ShaderMaterial;
} {
  const group = new THREE.Group();

  // 1. Earth Sphere with High-Resolution Day/Night Shader
  const earthGeom = new THREE.SphereGeometry(radius, 128, 128);
  const earthMat = createNasaEarthMaterial();
  const earthMesh = new THREE.Mesh(earthGeom, earthMat);
  earthMesh.rotation.z = 0.409; // 23.44 degree NASA axial tilt
  group.add(earthMesh);

  // 2. Separate Translucent Cloud Shell (tightly hugging the surface at +0.2% so no border protrudes)
  const cloudsGeom = new THREE.SphereGeometry(radius * 1.002, 128, 128);
  const cloudsTex = getNasaPlanetTexture('earth_clouds');
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: cloudsTex,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    roughness: 0.9,
  });
  const cloudsMesh = new THREE.Mesh(cloudsGeom, cloudsMat);
  cloudsMesh.rotation.z = 0.409;
  group.add(cloudsMesh);

  // Zero outer atmospheric shells or halos - Razor sharp planetary edges!
  return { group, earthMesh, cloudsMesh, earthMat };
}
