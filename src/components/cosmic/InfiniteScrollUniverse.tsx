'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  getNasaPlanetTexture,
  getStarTexture,
  getBrightStarTexture,
  createBlinkingStarsMaterial,
  createNasaEarthGroup,
} from '@/lib/cosmic/realisticTextures';

export const InfiniteScrollUniverse: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Deep Space Void (Pitch Black, Lost in the Stars)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.0003);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 4000);
    camera.position.set(0, 0, 115);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Realistic Celestial Lighting (NASA Sunlight Style)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Primary Solar Directional Light:
    // Placed to the RIGHT-FRONT to illuminate the day side on the right,
    // and cast the dark night side with glowing city lights on the left (facing the site),
    // matching NASA Eyes on the Earth!
    const sunLight = new THREE.DirectionalLight(0xfff8e8, 4.4);
    sunLight.position.set(130, 20, 60);
    scene.add(sunLight);

    // Soft galactic fill for the deep void
    const galaxyRimLight = new THREE.DirectionalLight(0x48cae4, 0.4);
    galaxyRimLight.position.set(-60, -25, -20);
    scene.add(galaxyRimLight);

    // 3. BLINKING / TWINKLING OPTICAL STARFIELDS (Calm & Serene, NOT fast moving)
    const softStarTex = getStarTexture();
    const brightStarTex = getBrightStarTexture();

    // Layer A: 5,500 Calm Blinking Stars with Custom GPU Twinkle Shader
    const starCount = 5500;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starPhases = new Float32Array(starCount);
    const starSpeeds = new Float32Array(starCount);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const r = 300 + Math.random() * 1500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPos[i3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i3 + 2] = r * Math.cos(phi);

      const colorChoice = Math.random();
      if (colorChoice < 0.65) {
        starColors[i3] = 0.98; starColors[i3 + 1] = 0.98; starColors[i3 + 2] = 1.0;
      } else if (colorChoice < 0.85) {
        starColors[i3] = 1.0; starColors[i3 + 1] = 0.88; starColors[i3 + 2] = 0.55; // divine gold
      } else {
        starColors[i3] = 0.6; starColors[i3 + 1] = 0.85; starColors[i3 + 2] = 1.0; // peacock blue
      }

      starPhases[i] = Math.random() * Math.PI * 2;
      starSpeeds[i] = 1.0 + Math.random() * 2.5; // gentle blinking speed
      starSizes[i] = 1.6 + Math.random() * 2.2;
    }

    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeom.setAttribute('aColor', new THREE.BufferAttribute(starColors, 3));
    starGeom.setAttribute('aTwinklePhase', new THREE.BufferAttribute(starPhases, 1));
    starGeom.setAttribute('aTwinkleSpeed', new THREE.BufferAttribute(starSpeeds, 1));
    starGeom.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = createBlinkingStarsMaterial(softStarTex);
    const distantStars = new THREE.Points(starGeom, starMaterial);
    scene.add(distantStars);

    // Layer B: 350 Bright Luminous Stars with 4-Point Optical Diffraction Spikes
    const brightCount = 350;
    const brightGeom = new THREE.BufferGeometry();
    const brightPos = new Float32Array(brightCount * 3);
    const brightColors = new Float32Array(brightCount * 3);
    const brightPhases = new Float32Array(brightCount);
    const brightSpeeds = new Float32Array(brightCount);
    const brightSizes = new Float32Array(brightCount);

    for (let i = 0; i < brightCount; i++) {
      const i3 = i * 3;
      brightPos[i3] = (Math.random() - 0.5) * 550;
      brightPos[i3 + 1] = (Math.random() - 0.5) * 450;
      brightPos[i3 + 2] = (Math.random() - 0.5) * 500;

      brightColors[i3] = 1.0;
      brightColors[i3 + 1] = 0.96;
      brightColors[i3 + 2] = 0.9;

      brightPhases[i] = Math.random() * Math.PI * 2;
      brightSpeeds[i] = 0.8 + Math.random() * 1.8;
      brightSizes[i] = 5.5 + Math.random() * 4.0;
    }

    brightGeom.setAttribute('position', new THREE.BufferAttribute(brightPos, 3));
    brightGeom.setAttribute('aColor', new THREE.BufferAttribute(brightColors, 3));
    brightGeom.setAttribute('aTwinklePhase', new THREE.BufferAttribute(brightPhases, 1));
    brightGeom.setAttribute('aTwinkleSpeed', new THREE.BufferAttribute(brightSpeeds, 1));
    brightGeom.setAttribute('aSize', new THREE.BufferAttribute(brightSizes, 1));

    const brightStarMaterial = createBlinkingStarsMaterial(brightStarTex);
    const brightStars = new THREE.Points(brightGeom, brightStarMaterial);
    scene.add(brightStars);

    // =========================================================================
    // 4. SEQUENTIAL SCROLL-SYNCED 3D PLANET STAGE ON THE RIGHT SIDE!
    // Exact NASA Eyes on the Earth specifications:
    // - Same size as NASA Eyes screenshot: diameter = ~86% of viewport height
    // - Exactly 25% of the diameter outside the right edge of the screen
    // - Zero white lines or rings
    // - Day side on the right, Night side with glowing city lights on the left
    // =========================================================================
    const STAGE_Z = 10;

    const calcStageCoords = (w: number, h: number) => {
      const asp = w / h;
      const vFOV = (46 * Math.PI) / 180;
      const visibleH = 2 * Math.tan(vFOV / 2) * (115 - STAGE_Z);
      const visibleW = visibleH * asp;
      const wHalf = visibleW / 2;

      // In NASA Eyes screenshot, Earth diameter is ~86% of viewport height:
      const r = (visibleH * 0.86) / 2; // radius ~38.33, diameter ~76.66

      if (asp < 1.05) {
        // Mobile / portrait: place nicely so 25% is outside right edge
        return { x: wHalf - 0.5 * r, y: -visibleH * 0.12, r };
      }

      // Desktop: Exactly 25% outside the screen:
      // Right edge of Earth = x + r
      // Right edge of screen = wHalf
      // x + r = wHalf + 0.5 * r  =>  x = wHalf - 0.5 * r
      const x = wHalf - 0.5 * r;
      const y = -0.5;
      return { x, y, r };
    };

    let stageCoords = calcStageCoords(width, height);
    let STAGE_X = stageCoords.x;
    let STAGE_Y = stageCoords.y;
    const PLANET_RADIUS = stageCoords.r;

    // --- PLANET 0: NASA 3D EARTH (Prithvi) - Day/Night & City Lights ---
    // Zero white rings! Pure photorealistic NASA globe.
    const { group: earthGroup, earthMesh, cloudsMesh, earthMat } = createNasaEarthGroup(PLANET_RADIUS);
    earthGroup.position.set(STAGE_X, STAGE_Y, STAGE_Z);
    scene.add(earthGroup);

    // Update Sun vector for Earth day/night terminator (Sun on the right-front)
    const sunDir = new THREE.Vector3().subVectors(sunLight.position, earthGroup.position).normalize();
    earthMat.uniforms.uSunDirection.value.copy(sunDir);

    // --- PLANET 1: JUPITER (Guru / Brihaspati) - NASA Cassini Great Red Spot ---
    // 100% sharp edges against space void
    const jupiterGroup = new THREE.Group();
    const jupiterTex = getNasaPlanetTexture('jupiter');
    const jupiterGeom = new THREE.SphereGeometry(PLANET_RADIUS, 128, 128);
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: jupiterTex,
      roughness: 0.55,
      metalness: 0.04,
    });
    const jupiterMesh = new THREE.Mesh(jupiterGeom, jupiterMat);
    jupiterMesh.rotation.z = 0.055; // 3.13 deg axial tilt
    jupiterGroup.add(jupiterMesh);

    // 4 Galilean Moons (Io, Europa, Ganymede, Callisto)
    const jupiterMoons: THREE.Mesh[] = [];
    const moonColors = [0xe8e0cf, 0xbdc6cf, 0x8b8071, 0x56534e];
    for (let m = 0; m < 4; m++) {
      const moonMesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.2 + m * 0.4, 32, 32),
        new THREE.MeshStandardMaterial({ color: moonColors[m], roughness: 0.85 })
      );
      jupiterMoons.push(moonMesh);
      jupiterGroup.add(moonMesh);
    }
    jupiterGroup.position.set(STAGE_X, -80, STAGE_Z);
    jupiterGroup.visible = false;
    scene.add(jupiterGroup);

    // --- PLANET 2: SATURN (Shani) - NASA Cassini Global Texture & Rings ---
    // 100% sharp edges against space void
    const saturnGroup = new THREE.Group();
    const saturnTex = getNasaPlanetTexture('saturn');
    const saturnRadius = PLANET_RADIUS * 0.65; // scale so rings fit majestically
    const saturnGeom = new THREE.SphereGeometry(saturnRadius, 128, 128);
    const saturnMat = new THREE.MeshStandardMaterial({
      map: saturnTex,
      roughness: 0.65,
      metalness: 0.08,
    });
    const saturnMesh = new THREE.Mesh(saturnGeom, saturnMat);
    saturnMesh.rotation.z = 0.47; // 26.73 deg axial tilt
    saturnMesh.rotation.x = 0.22;
    saturnGroup.add(saturnMesh);

    // Concentric Saturn Rings
    const ringInner = saturnRadius * 1.15;
    const ringOuter = saturnRadius * 2.25;
    const ringGeom = new THREE.RingGeometry(ringInner, ringOuter, 128);
    const pos = ringGeom.attributes.position;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      ringGeom.attributes.uv.setXY(i, (v3.length() - ringInner) / (ringOuter - ringInner), 0);
    }
    const ringTex = getNasaPlanetTexture('saturn_ring');
    const ringMat = new THREE.MeshStandardMaterial({
      map: ringTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      roughness: 0.7,
    });
    const saturnRings = new THREE.Mesh(ringGeom, ringMat);
    saturnRings.rotation.x = Math.PI / 2;
    saturnMesh.add(saturnRings);

    saturnGroup.position.set(STAGE_X, -80, STAGE_Z);
    saturnGroup.visible = false;
    scene.add(saturnGroup);

    // --- PLANET 3: MARS (Mangala) - NASA Viking Topography ---
    // 100% sharp edges against space void
    const marsGroup = new THREE.Group();
    const marsTex = getNasaPlanetTexture('mars');
    const marsRadius = PLANET_RADIUS * 0.9;
    const marsGeom = new THREE.SphereGeometry(marsRadius, 128, 128);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTex,
      roughness: 0.82,
      metalness: 0.05,
    });
    const marsMesh = new THREE.Mesh(marsGeom, marsMat);
    marsMesh.rotation.z = 0.44; // 25.19 deg axial tilt
    marsGroup.add(marsMesh);

    marsGroup.position.set(STAGE_X, -80, STAGE_Z);
    marsGroup.visible = false;
    scene.add(marsGroup);

    // --- PLANET 4: SUN (Surya Narayana) - NASA SDO 304Å Extreme UV Plasma ---
    // Clean, crisp solar sphere with sharp edges against space void
    const sunGroup = new THREE.Group();
    const sunTex = getNasaPlanetTexture('sun');
    const sunGeom = new THREE.SphereGeometry(PLANET_RADIUS, 128, 128);
    const sunMat = new THREE.MeshStandardMaterial({
      map: sunTex,
      emissive: 0xffaa22,
      emissiveMap: sunTex,
      emissiveIntensity: 0.95,
      roughness: 0.15,
      metalness: 0.0,
    });
    const sunMesh = new THREE.Mesh(sunGeom, sunMat);
    sunGroup.add(sunMesh);

    sunGroup.position.set(STAGE_X, -80, STAGE_Z);
    sunGroup.visible = false;
    scene.add(sunGroup);

    // Array of the 5 sequential planets on the right
    const planetStages = [
      { group: earthGroup, mesh: earthMesh, name: 'Earth' },
      { group: jupiterGroup, mesh: jupiterMesh, name: 'Jupiter' },
      { group: saturnGroup, mesh: saturnMesh, name: 'Saturn' },
      { group: marsGroup, mesh: marsMesh, name: 'Mars' },
      { group: sunGroup, mesh: sunMesh, name: 'Sun' },
    ];

    // 5. INTERACTION: SCROLL & DRAG ("when moved it should rotate slowly")
    let currentScrollY = window.scrollY || 0;
    let targetScrollY = currentScrollY;
    let lastScrollY = currentScrollY;

    // Interactive pointer drag to rotate slowly
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let dragVelocityY = 0;
    let dragVelocityX = 0;

    const handlePointerDown = (e: PointerEvent) => {
      // If clicked on the right half of the screen (the planet area)
      if (e.clientX > window.innerWidth * 0.5) {
        isDragging = true;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const dx = e.clientX - lastPointerX;
        const dy = e.clientY - lastPointerY;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
        // Slow gentle rotation velocity
        dragVelocityY += dx * 0.0008;
        dragVelocityX += dy * 0.0004;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const newCoords = calcStageCoords(w, h);
      STAGE_X = newCoords.x;
      STAGE_Y = newCoords.y;
    };
    window.addEventListener('resize', handleResize);

    // 6. 60 FPS Photorealistic Render Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Update Star Twinkling / Blinking
      starMaterial.uniforms.uTime.value = elapsed;
      brightStarMaterial.uniforms.uTime.value = elapsed;

      // Smooth scroll interpolation (lerp)
      currentScrollY += (targetScrollY - currentScrollY) * 0.07;
      const scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, currentScrollY / maxScroll));

      // Gentle, slow scroll rotation ("when moved it should rotate slowly")
      const scrollSpinMultiplier = scrollVelocity * 0.0012;

      // Combine idle planetary drift + scroll movement + interactive drag
      const totalSpinY = 0.0004 + scrollSpinMultiplier + dragVelocityY;
      const totalSpinX = dragVelocityX;

      // Smooth drag dampening
      dragVelocityY *= 0.93;
      dragVelocityX *= 0.93;

      // Rotate Earth slowly
      earthMesh.rotation.y += totalSpinY;
      cloudsMesh.rotation.y += totalSpinY * 1.25;

      // Subtle axial tilt adjustment from drag
      if (Math.abs(totalSpinX) > 0.00001) {
        earthGroup.rotation.x = THREE.MathUtils.clamp(earthGroup.rotation.x + totalSpinX, -0.25, 0.25);
      }

      // Other planets rotate slowly as well
      jupiterMesh.rotation.y += totalSpinY;
      saturnMesh.rotation.y += totalSpinY;
      marsMesh.rotation.y += totalSpinY * 1.1;
      sunMesh.rotation.y += totalSpinY * 0.4;

      // Orbit Jupiter's moons
      jupiterMoons.forEach((m, idx) => {
        const mAngle = elapsed * (0.6 + idx * 0.25);
        const mDist = PLANET_RADIUS * (1.35 + idx * 0.2);
        m.position.x = Math.cos(mAngle) * mDist;
        m.position.z = Math.sin(mAngle) * mDist;
        m.position.y = Math.sin(mAngle * 0.5) * 4;
      });

      // =========================================================================
      // ONE PLANET ON THE RIGHT AT A TIME (Scroll Transitions)
      // 5 Sequential Sections:
      // Section 0 [0.00 - 0.16]: NASA 3D Earth (Day/Night & Glowing City Lights)
      // Section 1 [0.16 - 0.38]: Jupiter (Cassini Great Red Spot & Moons)
      // Section 2 [0.38 - 0.60]: Saturn (Cassini Rings)
      // Section 3 [0.60 - 0.82]: Mars (Viking Topography)
      // Section 4 [0.82 - 1.00]: Surya Narayana Sun (Extreme UV Solar Corona)
      // =========================================================================
      const midpoints = [0.16, 0.38, 0.60, 0.82];
      const transHW = 0.035; // clean, swift 7% transition window

      // Reset all to invisible by default
      planetStages.forEach((s) => {
        s.group.visible = false;
      });

      // Find which zone we are in
      let transitionOccurred = false;
      for (let m = 0; m < midpoints.length; m++) {
        const mid = midpoints[m];
        if (scrollProgress >= mid - transHW && scrollProgress <= mid + transHW) {
          // In transition between stage m and stage m+1
          const t = (scrollProgress - (mid - transHW)) / (2 * transHW); // 0 to 1
          const outgoing = planetStages[m];
          const incoming = planetStages[m + 1];

          outgoing.group.visible = true;
          outgoing.group.position.set(STAGE_X, STAGE_Y + t * 55, STAGE_Z);
          outgoing.group.scale.setScalar(Math.max(0.01, 1.0 - t * 0.7));

          incoming.group.visible = true;
          incoming.group.position.set(STAGE_X, STAGE_Y - (1.0 - t) * 55, STAGE_Z);
          incoming.group.scale.setScalar(Math.max(0.01, 0.3 + t * 0.7));

          transitionOccurred = true;
          break;
        }
      }

      if (!transitionOccurred) {
        // Firmly in a single planet's section - EXACTLY ONE PLANET VISIBLE!
        let activeIdx = 0;
        if (scrollProgress < midpoints[0]) {
          activeIdx = 0; // Earth
        } else if (scrollProgress < midpoints[1]) {
          activeIdx = 1; // Jupiter
        } else if (scrollProgress < midpoints[2]) {
          activeIdx = 2; // Saturn
        } else if (scrollProgress < midpoints[3]) {
          activeIdx = 3; // Mars
        } else {
          activeIdx = 4; // Sun
        }

        const activeStage = planetStages[activeIdx];
        activeStage.group.visible = true;
        activeStage.group.position.set(STAGE_X, STAGE_Y, STAGE_Z);
        activeStage.group.scale.setScalar(1.0);
      }

      // Update Earth Sun Vector dynamically so Day/Night terminator matches light
      sunDir.subVectors(sunLight.position, earthGroup.position).normalize();
      earthMat.uniforms.uSunDirection.value.copy(sunDir);
      earthMat.uniforms.uCloudsOffset.value = elapsed * 0.002;

      // STARS: Calm, steady celestial drift (Peaceful & non-rushing)
      distantStars.rotation.y += 0.00002;
      brightStars.rotation.y -= 0.00003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 0 }}
    />
  );
};
