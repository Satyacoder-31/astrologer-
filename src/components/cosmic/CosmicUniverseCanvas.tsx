'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CosmicUniverseCanvasProps {
  interactive?: boolean;
  className?: string;
}

export const CosmicUniverseCanvas: React.FC<CosmicUniverseCanvasProps> = ({
  interactive = true,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080d24, 0.0012);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.set(0, 45, 130);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xd4af62, 0.7);
    scene.add(ambientLight);

    const centralSunLight = new THREE.PointLight(0xffddaa, 3.5, 600);
    centralSunLight.position.set(0, 0, 0);
    scene.add(centralSunLight);

    const purpleGlowLight = new THREE.PointLight(0x513b83, 2.5, 800);
    purpleGlowLight.position.set(0, 60, -80);
    scene.add(purpleGlowLight);

    // 1. Starfield Particles (Twinkling cosmic stars)
    const starCount = 3000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0xd4af62), // gold
      new THREE.Color(0x087e8b), // peacock blue
      new THREE.Color(0xf5f1e8), // celestial white
      new THREE.Color(0xe6a64a), // saffron
      new THREE.Color(0x513b83), // royal purple
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 100 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.45;
      starPositions[i3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 2. Central Divine Sun / Golden Mandala Core
    const sunGeom = new THREE.SphereGeometry(7, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffe6a3,
    });
    const sunMesh = new THREE.Mesh(sunGeom, sunMat);
    scene.add(sunMesh);

    // Glow aura around central sun
    const glowGeom = new THREE.SphereGeometry(9.5, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xd4af62,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeom, glowMat);
    scene.add(glowMesh);

    // 3. Rotating Golden Zodiac Wheel
    const ringGeom = new THREE.RingGeometry(85, 87, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af62,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const zodiacRing = new THREE.Mesh(ringGeom, ringMat);
    zodiacRing.rotation.x = Math.PI / 2;
    scene.add(zodiacRing);

    // Outer subtle constellation ring
    const outerRingGeom = new THREE.RingGeometry(110, 111, 128);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x087e8b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    scene.add(outerRing);

    // 4. Navagraha Planetary Orbits and Spheres
    // Mercury, Venus, Moon, Mars, Jupiter, Saturn, Rahu, Ketu
    interface PlanetData {
      name: string;
      radius: number;
      orbitRadius: number;
      speed: number;
      color: number;
      angle: number;
      mesh?: THREE.Mesh;
    }

    const planetsData: PlanetData[] = [
      { name: 'Mercury (Budha)', radius: 1.2, orbitRadius: 16, speed: 0.024, color: 0x2ec4b6, angle: 0 },
      { name: 'Venus (Shukra)', radius: 1.8, orbitRadius: 24, speed: 0.018, color: 0xffffff, angle: 1.2 },
      { name: 'Moon (Chandra)', radius: 1.4, orbitRadius: 33, speed: 0.015, color: 0xe0e1dd, angle: 2.8 },
      { name: 'Mars (Mangala)', radius: 1.5, orbitRadius: 42, speed: 0.012, color: 0xe63946, angle: 4.1 },
      { name: 'Jupiter (Guru)', radius: 3.8, orbitRadius: 55, speed: 0.008, color: 0xe6a64a, angle: 0.7 },
      { name: 'Saturn (Shani)', radius: 3.2, orbitRadius: 69, speed: 0.006, color: 0x8d99ae, angle: 3.3 },
      { name: 'Rahu', radius: 1.6, orbitRadius: 80, speed: -0.005, color: 0x3d0c02, angle: 5.2 },
      { name: 'Ketu', radius: 1.6, orbitRadius: 80, speed: -0.005, color: 0x7209b7, angle: 5.2 + Math.PI },
    ];

    // Create orbital trails and planet meshes
    planetsData.forEach((planet) => {
      // Orbit circle line
      const orbitGeom = new THREE.RingGeometry(planet.orbitRadius - 0.15, planet.orbitRadius + 0.15, 64);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0xd4af62,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15,
      });
      const orbitMesh = new THREE.Mesh(orbitGeom, orbitMat);
      orbitMesh.rotation.x = Math.PI / 2;
      scene.add(orbitMesh);

      // Planet sphere
      const pGeom = new THREE.SphereGeometry(planet.radius, 24, 24);
      const pMat = new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.4,
        metalness: 0.2,
      });
      const pMesh = new THREE.Mesh(pGeom, pMat);

      // Saturn Rings
      if (planet.name.includes('Saturn')) {
        const satRingGeom = new THREE.RingGeometry(planet.radius + 1.2, planet.radius + 3.2, 32);
        const satRingMat = new THREE.MeshBasicMaterial({
          color: 0xc9ada7,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.65,
        });
        const satRingMesh = new THREE.Mesh(satRingGeom, satRingMat);
        satRingMesh.rotation.x = Math.PI / 3;
        pMesh.add(satRingMesh);
      }

      scene.add(pMesh);
      planet.mesh = pMesh;
    });

    // 5. Golden Floating Dust Particles
    const dustCount = 400;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPositions[i3] = (Math.random() - 0.5) * 200;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 60;
      dustPositions[i3 + 2] = (Math.random() - 0.5) * 200;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 2.2,
      color: 0xd4af62,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(dustGeometry, dustMat);
    scene.add(dustParticles);

    // Mouse / Touch Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;
      camera.position.x = targetX * 0.3;
      camera.position.y = 45 - targetY * 0.3;
      camera.lookAt(0, 0, 0);

      // Rotate galaxy and zodiac rings
      starField.rotation.y += 0.0003;
      zodiacRing.rotation.z += 0.001;
      outerRing.rotation.z -= 0.0007;

      // Pulse sun glow
      const scale = 1 + Math.sin(elapsed * 2) * 0.08;
      glowMesh.scale.set(scale, scale, scale);

      // Orbit planets
      planetsData.forEach((planet) => {
        planet.angle += planet.speed * 0.5;
        if (planet.mesh) {
          planet.mesh.position.x = Math.cos(planet.angle) * planet.orbitRadius;
          planet.mesh.position.z = Math.sin(planet.angle) * planet.orbitRadius;
          planet.mesh.position.y = Math.sin(planet.angle * 2) * 1.5;
          planet.mesh.rotation.y += 0.02;
        }
      });

      // Float dust
      dustParticles.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};
