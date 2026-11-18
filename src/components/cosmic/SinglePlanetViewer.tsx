'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Compass,
  Flame,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  RefreshCw,
  Globe,
  Gauge,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  getNasaPlanetTexture,
  getStarTexture,
  createNasaEarthGroup,
} from '@/lib/cosmic/realisticTextures';

interface PlanetProfile {
  id: string;
  name: string;
  sanskrit: string;
  deity: string;
  mantra: string;
  color: string;
  radius: number;
  rotationSpeed: number;
  axialTilt: number; // in radians
  hasRings?: boolean;
  textureName: string;
  planetType: string;
  diameterKm: string;
  distFromSun: string;
  orbitalPeriod: string;
  dayLength: string;
  moonsCount: string;
  description: string;
  vedicSignificance: string;
  gemstone: string;
  rulingSign: string;
}

const NASA_PLANETS: PlanetProfile[] = [
  {
    id: 'jupiter',
    name: 'Jupiter (Guru)',
    sanskrit: 'बृहस्पति (Brihaspati)',
    deity: 'Lord Brihaspati',
    mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥',
    color: '#D4AF62',
    radius: 7.2,
    rotationSpeed: 0.009,
    axialTilt: 0.054, // 3.13 deg
    textureName: 'jupiter',
    planetType: 'Gas Giant • Benefic Graha',
    diameterKm: '142,984 km',
    distFromSun: '778.5 million km (5.2 AU)',
    orbitalPeriod: '11.86 Earth Years',
    dayLength: '9.93 Hours',
    moonsCount: '95 Moons (Io, Europa, Ganymede, Callisto)',
    description: 'The largest planet in the solar system, NASA imagery reveals majestic swirling atmospheric jet streams and the iconic 350-year-old Great Red Spot anticyclonic storm.',
    vedicSignificance: 'Supreme karaka for divine wisdom, dharma, progeny, higher knowledge, wealth, and spiritual liberation.',
    gemstone: 'Yellow Sapphire (Pukhraj)',
    rulingSign: 'Dhanu (Sagittarius) & Meena (Pisces)',
  },
  {
    id: 'saturn',
    name: 'Saturn (Shani)',
    sanskrit: 'शनैश्चर (Shani Deva)',
    deity: 'Lord Shani / Kurma Avatar',
    mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥',
    color: '#D4C29D',
    radius: 6.0,
    rotationSpeed: 0.008,
    axialTilt: 0.466, // 26.73 deg
    hasRings: true,
    textureName: 'saturn',
    planetType: 'Gas Giant with Ring System',
    diameterKm: '120,536 km',
    distFromSun: '1.43 billion km (9.58 AU)',
    orbitalPeriod: '29.45 Earth Years',
    dayLength: '10.7 Hours',
    moonsCount: '146 Moons (Titan, Enceladus)',
    description: 'Adorned with the solar system’s most dazzling concentric ring system spanning 282,000 km, displaying the dark Cassini Division gap captured by NASA Cassini.',
    vedicSignificance: 'The karmic taskmaster delivering discipline, longevity, patience, justice, and detachment through Sade Sati.',
    gemstone: 'Blue Sapphire (Neelam)',
    rulingSign: 'Makara (Capricorn) & Kumbha (Aquarius)',
  },
  {
    id: 'mars',
    name: 'Mars (Mangala)',
    sanskrit: 'मंगल (Kuja / Angaraka)',
    deity: 'Lord Kartikeya (Murugan)',
    mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः॥',
    color: '#E63946',
    radius: 5.2,
    rotationSpeed: 0.012,
    axialTilt: 0.44, // 25.19 deg
    textureName: 'mars',
    planetType: 'Terrestrial Desert Planet',
    diameterKm: '6,779 km',
    distFromSun: '227.9 million km (1.52 AU)',
    orbitalPeriod: '687 Earth Days',
    dayLength: '24.62 Hours',
    moonsCount: '2 Moons (Phobos & Deimos)',
    description: 'The Red Planet, mapped in detail by NASA Viking, Mars Global Surveyor, and Perseverance, featuring Valles Marineris and glistening water-ice polar caps.',
    vedicSignificance: 'The cosmic commander governing fiery courage, physical vigor, land, engineering, and Kuja / Manglik Dosha.',
    gemstone: 'Red Coral (Moonga)',
    rulingSign: 'Mesha (Aries) & Vrishchika (Scorpio)',
  },
  {
    id: 'sun',
    name: 'Sun (Surya)',
    sanskrit: 'सूर्य (Surya Narayana)',
    deity: 'Lord Surya Narayana',
    mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः॥',
    color: '#FFAA00',
    radius: 7.6,
    rotationSpeed: 0.005,
    axialTilt: 0.126, // 7.25 deg
    textureName: 'sun',
    planetType: 'G2V Yellow Dwarf Star',
    diameterKm: '1,392,700 km',
    distFromSun: 'Center of Solar System (0 AU)',
    orbitalPeriod: '230 Million Years (Galactic Orbit)',
    dayLength: '27 Days (Differential Rotation)',
    moonsCount: '8 Planets & Billions of Bodies',
    description: 'Captured in 304Å extreme ultraviolet by NASA SDO (Solar Dynamics Observatory), exhibiting magnetic sunspot active regions and radiant solar flares.',
    vedicSignificance: 'The king of planets, representing the immortal Atma (Soul), divine vitality, father, and government power.',
    gemstone: 'Ruby (Manikya)',
    rulingSign: 'Simha (Leo)',
  },
  {
    id: 'earth',
    name: 'Earth (Prithvi)',
    sanskrit: 'पृथ्वी (Bhumi Devi)',
    deity: 'Goddess Bhumi / Prithvi',
    mantra: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं॥',
    color: '#4895EF',
    radius: 5.4,
    rotationSpeed: 0.01,
    axialTilt: 0.409, // 23.44 deg
    textureName: 'earth',
    planetType: 'Ocean Planet • Sanctuary of Life',
    diameterKm: '12,742 km',
    distFromSun: '149.6 million km (1.0 AU)',
    orbitalPeriod: '365.25 Days',
    dayLength: '24.00 Hours',
    moonsCount: '1 Natural Satellite (Chandra)',
    description: 'NASA Blue Marble global composite displaying expansive liquid oceans, continental landmasses, and atmospheric circulation.',
    vedicSignificance: 'Sacred Bhumi Devi, the conscious mother offering grounding, endurance, nourishment, and karma-kshetra.',
    gemstone: 'Emerald / Jade',
    rulingSign: 'Anchor of Lagna & Horary Charts',
  },
  {
    id: 'moon',
    name: 'Moon (Chandra)',
    sanskrit: 'चन्द्र (Soma Deva)',
    deity: 'Lord Shiva / Soma',
    mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः॥',
    color: '#E0E1DD',
    radius: 4.8,
    rotationSpeed: 0.007,
    axialTilt: 0.027, // 1.54 deg
    textureName: 'moon',
    planetType: 'Natural Lunar Satellite',
    diameterKm: '3,474 km',
    distFromSun: '384,400 km from Earth',
    orbitalPeriod: '27.3 Earth Days',
    dayLength: '29.5 Days (Synodic Phase)',
    moonsCount: 'Orbits Planet Earth',
    description: 'NASA LRO photographic Clementine map showing dark volcanic basalt Maria (Sea of Tranquility) and Tycho impact crater ray systems.',
    vedicSignificance: 'Queen of planets governing Manas (mind), emotional tranquility, intuition, mother, and Janma Nakshatra.',
    gemstone: 'Natural Pearl (Moti)',
    rulingSign: 'Karka (Cancer)',
  },
  {
    id: 'venus',
    name: 'Venus (Shukra)',
    sanskrit: 'शुक्र (Shukracharya)',
    deity: 'Goddess Lakshmi',
    mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः॥',
    color: '#F4ECE1',
    radius: 5.3,
    rotationSpeed: 0.006,
    axialTilt: 3.096, // 177.3 deg retrograde
    textureName: 'venus',
    planetType: 'Volcanic Terrestrial Planet',
    diameterKm: '12,104 km',
    distFromSun: '108.2 million km (0.72 AU)',
    orbitalPeriod: '224.7 Earth Days',
    dayLength: '243 Earth Days (Retrograde)',
    moonsCount: '0 Moons',
    description: 'Mapped by NASA Magellan synthetic aperture radar penetrating dense sulfuric acid clouds to reveal volcanic calderas and tesserae.',
    vedicSignificance: 'Celestial guru of aesthetics, unconditional love, artistic creativity, marital bliss, and prosperity.',
    gemstone: 'Diamond (Heera)',
    rulingSign: 'Vrishabha (Taurus) & Tula (Libra)',
  },
  {
    id: 'mercury',
    name: 'Mercury (Budha)',
    sanskrit: 'बुध (Budha Deva)',
    deity: 'Lord Vishnu',
    mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः॥',
    color: '#8A9A86',
    radius: 4.2,
    rotationSpeed: 0.011,
    axialTilt: 0.0005, // 0.03 deg
    textureName: 'mercury',
    planetType: 'Dense Iron Core Terrestrial',
    diameterKm: '4,879 km',
    distFromSun: '57.9 million km (0.39 AU)',
    orbitalPeriod: '88.0 Earth Days',
    dayLength: '58.6 Earth Days (3:2 Spin-Orbit)',
    moonsCount: '0 Moons',
    description: 'NASA MESSENGER global mosaic showing the massive Caloris Basin, ancient impact scarps, and silicate regolith.',
    vedicSignificance: 'The prince of intellect (Buddhi), sharp analytical mind, commerce, speech, and astrology.',
    gemstone: 'Emerald (Panna)',
    rulingSign: 'Mithuna (Gemini) & Kanya (Virgo)',
  },
];

export const SinglePlanetViewer: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetProfile>(NASA_PLANETS[0]);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const mountRef = useRef<HTMLDivElement>(null);
  const planetMeshRef = useRef<THREE.Mesh | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.min(36, Math.max(13, cameraRef.current.position.z + delta));
  };

  const handleReset = () => {
    if (!cameraRef.current || !planetMeshRef.current) return;
    cameraRef.current.position.z = 24;
    planetMeshRef.current.rotation.set(0, 0, 0);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. NASA Realistic Directional Sunlight
    const sunLight = new THREE.DirectionalLight(0xfff6dd, 3.8);
    sunLight.position.set(22, 12, 16);
    scene.add(sunLight);

    const backRimLight = new THREE.DirectionalLight(0x48cae4, 0.7);
    backRimLight.position.set(-20, -10, -15);
    scene.add(backRimLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    // Deep space calm starry backdrop
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(350 * 3);
    for (let i = 0; i < 350 * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 90;
      starPos[i + 1] = (Math.random() - 0.5) * 90;
      starPos[i + 2] = -25 - Math.random() * 40;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 1.8,
      map: getStarTexture(),
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(starGeom, starMat));

    // 3. NASA 128x128 High-Poly Sphere Geometry & Real Photographic Texture
    const geom = new THREE.SphereGeometry(selectedPlanet.radius, 128, 128);
    const texture = getNasaPlanetTexture(selectedPlanet.textureName);

    let mat: THREE.Material;
    let ringsMesh: THREE.Mesh | null = null;
    let planetMesh: THREE.Mesh | null = null;

    let earthElements: ReturnType<typeof createNasaEarthGroup> | null = null;

    if (selectedPlanet.textureName === 'earth') {
      earthElements = createNasaEarthGroup(selectedPlanet.radius);
      planetMeshRef.current = earthElements.earthMesh;
      planetMesh = earthElements.earthMesh;
      scene.add(earthElements.group);
    } else if (selectedPlanet.textureName === 'sun') {
      mat = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: 0xffaa22,
        emissiveMap: texture,
        emissiveIntensity: 0.95,
        roughness: 0.15,
        metalness: 0.0,
      });

      planetMesh = new THREE.Mesh(geom, mat);
      planetMeshRef.current = planetMesh;
      planetMesh.rotation.z = selectedPlanet.axialTilt;
      scene.add(planetMesh);
    } else {
      mat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.7,
        metalness: 0.05,
      });

      // Sharp planetary sphere with 100% crisp edges
      planetMesh = new THREE.Mesh(geom, mat);
      planetMeshRef.current = planetMesh;
      planetMesh.rotation.z = selectedPlanet.axialTilt;
      scene.add(planetMesh);
    }

    // NASA Cassini Rings with Alpha Transparency
    if (selectedPlanet.hasRings && planetMesh) {
      const ringInner = selectedPlanet.radius * 1.35;
      const ringOuter = selectedPlanet.radius * 2.75;
      const ringGeom = new THREE.RingGeometry(ringInner, ringOuter, 128);

      const posAttr = ringGeom.attributes.position;
      const v3 = new THREE.Vector3();
      for (let i = 0; i < posAttr.count; i++) {
        v3.fromBufferAttribute(posAttr, i);
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
      ringsMesh = new THREE.Mesh(ringGeom, ringMat);
      ringsMesh.rotation.x = Math.PI / 2.25;
      ringsMesh.rotation.y = 0.18;
      planetMesh.add(ringsMesh);
    }

    // 4. Mouse & Touch Drag Controls (NASA 360 Orbit Interaction)
    const onStart = (clientX: number, clientY: number) => {
      isDraggingRef.current = true;
      previousPointerPos.current = { x: clientX, y: clientY };
    };

    const onMove = (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;
      const deltaX = clientX - previousPointerPos.current.x;
      const deltaY = clientY - previousPointerPos.current.y;

      if (earthElements) {
        earthElements.earthMesh.rotation.y += deltaX * 0.012;
        earthElements.cloudsMesh.rotation.y += deltaX * 0.012;
        earthElements.earthMesh.rotation.x += deltaY * 0.012;
        earthElements.cloudsMesh.rotation.x += deltaY * 0.012;
      } else if (planetMeshRef.current) {
        planetMeshRef.current.rotation.y += deltaX * 0.012;
        planetMeshRef.current.rotation.x += deltaY * 0.012;
      }

      previousPointerPos.current = { x: clientX, y: clientY };
    };

    const onEnd = () => {
      isDraggingRef.current = false;
    };

    const handleMouseDown = (e: MouseEvent) => onStart(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleMouseUp = () => onEnd();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => onEnd();

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 5. Render loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (earthElements) {
        if (autoRotate && !isDraggingRef.current) {
          earthElements.earthMesh.rotation.y += selectedPlanet.rotationSpeed;
          earthElements.cloudsMesh.rotation.y += selectedPlanet.rotationSpeed * 1.25;
        }
      } else if (autoRotate && !isDraggingRef.current && planetMeshRef.current) {
        planetMeshRef.current.rotation.y += selectedPlanet.rotationSpeed;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
    };
  }, [selectedPlanet, autoRotate]);

  return (
    <div className="rounded-3xl bg-black/90 border-2 border-cosmic-gold/40 p-6 md:p-10 shadow-2xl backdrop-blur-2xl">
      {/* Header & Planet Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/30 text-cosmic-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5 text-cosmic-gold animate-spin-slow" />
            NASA Solar System 3D Planetary Observatory
          </div>
          <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-white flex items-center gap-2">
            Explore the 3D Planets
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-poppins font-normal">
              NASA 2K Imagery
            </span>
          </h2>
          <p className="text-xs text-cosmic-white/60 font-poppins">
            NASA spacecraft photographic textures & astronomical telemetry combined with sacred Vedic Astrological wisdom. Drag with mouse or finger to spin in 360°.
          </p>
        </div>

        {/* Planet Select Tabs */}
        <div className="flex flex-wrap gap-2">
          {NASA_PLANETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlanet(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedPlanet.id === p.id
                  ? 'bg-cosmic-gold text-black font-bold shadow-goldGlow scale-105'
                  : 'bg-black/60 border border-cosmic-gold/20 text-cosmic-white/70 hover:text-cosmic-white hover:border-cosmic-gold/50'
              }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D Interactive Canvas & Toolbar */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[440px] aspect-square rounded-3xl bg-black border border-cosmic-gold/30 shadow-[0_0_90px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* The WebGL Canvas */}
            <div
              ref={mountRef}
              className="w-full h-full cursor-grab active:cursor-grabbing relative"
            />

            {/* Viewport Floating Controls */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-2xl bg-black/85 backdrop-blur-md border border-cosmic-gold/25 text-xs">
              <span className="text-[11px] text-cosmic-white/70 font-poppins flex items-center gap-1.5">
                <RotateCw className="w-3 h-3 text-cosmic-gold" />
                360° NASA 3D Orbit
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    autoRotate
                      ? 'bg-cosmic-gold/20 text-cosmic-gold border-cosmic-gold/40'
                      : 'bg-black/60 text-cosmic-white/50 border-white/10'
                  }`}
                  title={autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
                >
                  {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleZoom(-3)}
                  className="p-1.5 rounded-lg bg-black/60 text-cosmic-white/70 border border-white/10 hover:text-cosmic-gold transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleZoom(3)}
                  className="p-1.5 rounded-lg bg-black/60 text-cosmic-white/70 border border-white/10 hover:text-cosmic-gold transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-black/60 text-cosmic-white/70 border border-white/10 hover:text-cosmic-gold transition-colors"
                  title="Reset View"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Planet NASA Telemetry + Vedic Astrological Data Card */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-gold">
                  {selectedPlanet.name}
                </h3>
                <span className="font-devanagari text-lg text-amber-200">
                  {selectedPlanet.sanskrit}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-medium text-cyan-300 block mt-0.5">
              {selectedPlanet.planetType}
            </span>
            <p className="text-xs md:text-sm text-cosmic-white/80 font-poppins mt-2 leading-relaxed">
              {selectedPlanet.description}
            </p>
          </div>

          {/* NASA Scientific Telemetry Grid */}
          <div className="p-3.5 rounded-2xl bg-black/80 border border-cyan-500/20 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Gauge className="w-3 h-3 text-cyan-400" />
              NASA Planetary Telemetry
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-cosmic-white/50 block">Diameter:</span>
                <span className="text-cosmic-white font-mono">{selectedPlanet.diameterKm}</span>
              </div>
              <div>
                <span className="text-[10px] text-cosmic-white/50 block">Distance to Sun:</span>
                <span className="text-cosmic-white font-mono">{selectedPlanet.distFromSun}</span>
              </div>
              <div>
                <span className="text-[10px] text-cosmic-white/50 block">Orbital Period:</span>
                <span className="text-cosmic-white font-mono">{selectedPlanet.orbitalPeriod}</span>
              </div>
              <div>
                <span className="text-[10px] text-cosmic-white/50 block">Length of Day:</span>
                <span className="text-cosmic-white font-mono">{selectedPlanet.dayLength}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-white/5">
                <span className="text-[10px] text-cosmic-white/50 block">Moons / Satellites:</span>
                <span className="text-cyan-200 text-[11px] font-poppins">{selectedPlanet.moonsCount}</span>
              </div>
            </div>
          </div>

          {/* Sacred Vedic Beej Mantra */}
          <div className="p-3.5 rounded-2xl bg-black/95 border border-cosmic-gold/40 shadow-inner space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cosmic-gold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-cosmic-saffron" />
              Sacred Vedic Beej Mantra
            </span>
            <div className="font-devanagari text-base md:text-lg text-amber-200 font-bold tracking-wide">
              {selectedPlanet.mantra}
            </div>
          </div>

          {/* Vedic Astrology Attributes */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-black/60 border border-cosmic-border/30">
              <span className="block text-[10px] text-cosmic-gold uppercase tracking-wider font-semibold">
                Ruling Rashi
              </span>
              <span className="text-cosmic-white/90 font-medium">{selectedPlanet.rulingSign}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/60 border border-cosmic-border/30">
              <span className="block text-[10px] text-cosmic-gold uppercase tracking-wider font-semibold">
                Auspicious Gemstone
              </span>
              <span className="text-cosmic-white/90 font-medium">{selectedPlanet.gemstone}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/70 border border-cosmic-border/30 text-xs text-cosmic-white/70">
            <strong className="text-cosmic-gold">Vedic Astrological Karakatva: </strong>
            {selectedPlanet.vedicSignificance}
          </div>
        </div>
      </div>
    </div>
  );
};
