import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export function ThreeIntro({ onFinish, embedded: embeddedProp = false, isMobile = false }) {
  const embedded = embeddedProp || isMobile;
  const { lang, toggleLang, t } = useLanguage();
  const { effectiveTheme } = useTheme();
  const containerRef = useRef(null);
  const splashRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [logoBlur, setLogoBlur] = useState(true);

  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const isFlyingRef = useRef(false);
  const isFinishedRef = useRef(false);

  const instancedMeshRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const touchStartYRef = useRef(null);

  // Voxel data & Cursor Repulsion state
  const voxelsDataRef = useRef([]);
  const dummyRef = useRef(new THREE.Object3D());
  const mousePos3D = useRef(new THREE.Vector3(9999, 9999, 0));
  const isPointerOverRef = useRef(false);
  const raycasterRef = useRef(new THREE.Raycaster());
  const planeZ0Ref = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const planeIntersectRef = useRef(new THREE.Vector3());

  const getStartCameraZ = (aspect) => {
    if (aspect < 0.6) {
      // Tall mobile portrait screen (e.g. 375x812 inside phone simulator)
      return 260;
    } else if (aspect < 1.0) {
      return 210;
    }
    return 195; // Desktop widescreen
  };

  const getEmblemMaterial = (isDark) => {
    if (isDark) {
      // Pristine Physical PBR Gold - Zero muddy emissive glow
      return new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.82,
        roughness: 0.32,
        emissive: 0x000000,
        emissiveIntensity: 0
      });
    }
    // Pristine UNITBV Architectural Blue - Crisp physical shading
    return new THREE.MeshStandardMaterial({
      color: 0x003c7e,
      metalness: 0.55,
      roughness: 0.38,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
  };

  const finish = (immediate = false) => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    if (!embedded) {
      sessionStorage.setItem('unitbv_intro_seen', 'true');
      document.documentElement.classList.remove('intro-locked');
      document.body.classList.remove('intro-locked');
      window.scrollTo(0, 0);
    }

    if (splashRef.current) {
      splashRef.current.style.pointerEvents = 'none';
      if (immediate) {
        splashRef.current.style.display = 'none';
        onFinish?.();
      } else {
        gsap.to(splashRef.current, {
          opacity: 0,
          scale: 1.04,
          duration: 0.35,
          ease: 'power2.out',
          onComplete: () => {
            if (splashRef.current) splashRef.current.style.display = 'none';
            onFinish?.();
          }
        });
      }
    } else {
      onFinish?.();
    }
  };

  const flyThrough = () => {
    if (isFlyingRef.current || isFinishedRef.current) return;
    setTextVisible(false);
    setLogoBlur(false);
    isFlyingRef.current = true;

    gsap.to(targetProgressRef, {
      current: 1.0,
      duration: embedded ? 2.0 : 2.4,
      ease: 'power2.inOut',
      onComplete: () => {
        isFlyingRef.current = false;
      }
    });
  };

  useEffect(() => {
    // Only lock window scroll if this is full desktop intro, NOT embedded in mobile mockup
    if (!embedded) {
      document.documentElement.classList.add('intro-locked');
      document.body.classList.add('intro-locked');
      window.scrollTo(0, 0);
    }

    const container = containerRef.current;
    const splash = splashRef.current;
    if (!container || !splash) return;

    const width = container.clientWidth || (embedded ? 361 : window.innerWidth);
    const height = container.clientHeight || (embedded ? 766 : window.innerHeight);
    const aspect = width / height;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const startZ = getStartCameraZ(aspect);
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 0, startZ);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Balanced Studio Lights (Physical PBR Shading without Hotspots or Emissive Glow)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(60, 80, 100);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.6);
    fillLight.position.set(-60, 40, 80);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x94a3b8, 0.7);
    rimLight.position.set(0, -60, -50);
    scene.add(rimLight);

    // Load Voxel Emblem
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const w = img.naturalWidth || 512;
      const h = img.naturalHeight || 512;
      const cvs = document.createElement('canvas');
      cvs.width = w;
      cvs.height = h;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h).data;
      const step = 6;
      const cellSize = 1.35;
      const cellDepth = 5.5;
      const validVoxels = [];
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const offsetX = -(cols * cellSize) / 2;
      const offsetY = (rows * cellSize) / 2;

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const px = gx * step;
          const py = gy * step;
          const idx = (py * w + px) * 4;
          const a = imgData[idx + 3];
          if (a > 60) {
            const x = offsetX + gx * cellSize + cellSize / 2;
            const y = offsetY - gy * cellSize - cellSize / 2;
            const distFromCenter = Math.sqrt(x * x + y * y);
            const z = Math.max(0, 2.2 - (distFromCenter / 45));
            validVoxels.push({ x, y, z });
          }
        }
      }

      if (validVoxels.length === 0) return;

      // Center exactly around (0,0) so the center aperture lines up
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const v of validVoxels) {
        if (v.x < minX) minX = v.x;
        if (v.x > maxX) maxX = v.x;
        if (v.y < minY) minY = v.y;
        if (v.y > maxY) maxY = v.y;
      }
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      // Store initial rest positions & dynamic displacement for interactive avoidance
      const voxelsData = [];
      for (let i = 0; i < validVoxels.length; i++) {
        const v = validVoxels[i];
        v.x -= centerX;
        v.y -= centerY;
        voxelsData.push({
          origX: v.x,
          origY: v.y,
          origZ: v.z,
          dispX: 0,
          dispY: 0,
          dispZ: 0
        });
      }
      voxelsDataRef.current = voxelsData;

      const cubeGeo = new THREE.BoxGeometry(cellSize * 0.94, cellSize * 0.94, cellDepth);
      const mat = getEmblemMaterial(effectiveTheme === 'dark');
      const mesh = new THREE.InstancedMesh(cubeGeo, mat, validVoxels.length);
      const dummy = dummyRef.current;

      for (let i = 0; i < validVoxels.length; i++) {
        const v = validVoxels[i];
        dummy.position.set(v.x, v.y, v.z);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      mesh.position.set(0, 0, 0);
      scene.add(mesh);
      instancedMeshRef.current = mesh;
    };
    img.src = '/assets/branding/unitbv-symbol.png';

    // Wheel listener
    const handleWheel = (e) => {
      if (isFinishedRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      if (!embedded) window.scrollTo(0, 0);
      setTextVisible(false);
      setLogoBlur(false);
      const delta = e.deltaY;
      const sensitivity = embedded ? 0.0022 : 0.0014;
      targetProgressRef.current = Math.max(0, Math.min(1.0, targetProgressRef.current + delta * sensitivity));
    };

    const handleTouchStart = (e) => {
      if (isFinishedRef.current) return;
      if (e.touches.length > 0) touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isFinishedRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      if (!embedded) window.scrollTo(0, 0);
      setTextVisible(false);
      setLogoBlur(false);
      if (touchStartYRef.current !== null && e.touches.length > 0) {
        const deltaY = touchStartYRef.current - e.touches[0].clientY;
        touchStartYRef.current = e.touches[0].clientY;
        targetProgressRef.current = Math.max(0, Math.min(1.0, targetProgressRef.current + deltaY * (embedded ? 0.0045 : 0.0035)));
      }
    };

    // Pointer Move: Project cursor onto the 3D plane at z=0 for interactive voxel avoidance!
    const handlePointerMove = (e) => {
      if (isFinishedRef.current || !splashRef.current || !cameraRef.current) return;
      const rect = splashRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera({ x: ndcX, y: ndcY }, cameraRef.current);
      if (raycasterRef.current.ray.intersectPlane(planeZ0Ref.current, planeIntersectRef.current)) {
        mousePos3D.current.copy(planeIntersectRef.current);
        isPointerOverRef.current = true;
      }
    };

    const handlePointerLeave = () => {
      isPointerOverRef.current = false;
      mousePos3D.current.set(9999, 9999, 0);
    };

    const handleKeyDown = (e) => {
      if (isFinishedRef.current) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        flyThrough();
      }
    };

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
      const w = containerRef.current.clientWidth || (embedded ? 361 : window.innerWidth);
      const h = containerRef.current.clientHeight || (embedded ? 766 : window.innerHeight);
      const asp = w / h;
      cameraRef.current.aspect = asp;
      cameraRef.current.position.z = getStartCameraZ(asp);
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const targetEventElement = embedded ? splash : window;
    targetEventElement.addEventListener('wheel', handleWheel, { passive: false });
    targetEventElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    targetEventElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    targetEventElement.addEventListener('pointermove', handlePointerMove, { passive: true });
    targetEventElement.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    if (!embedded) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
    }

    // Animation Loop with Interactive Cursor Avoidance Physics
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      if (isFinishedRef.current) return;
      animId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const lerpFactor = isFlyingRef.current ? 0.15 : 0.085;
      progressRef.current += (targetProgressRef.current - progressRef.current) * lerpFactor;
      progressRef.current = Math.max(0, Math.min(1.0, progressRef.current));
      setProgress(progressRef.current);

      if (!embedded && window.scrollY !== 0) window.scrollTo(0, 0);

      const currentProg = progressRef.current;
      const mesh = instancedMeshRef.current;
      const cam = cameraRef.current;
      const voxels = voxelsDataRef.current;

      // 1. Interactive Voxel Cursor Repulsion / Avoidance Physics
      if (mesh && voxels.length > 0) {
        const dummy = dummyRef.current;
        const targetMouse = isPointerOverRef.current ? mousePos3D.current : null;
        // Tight, subtle repulsion radius (reduced to half for a refined, intimate parting right at cursor tip)
        const repulsionRadius = embedded ? 9.5 : 12;
        const maxDisplacement = embedded ? 3.5 : 4.8;
        // Dissolve avoidance during scroll fly-through so the center aperture stays crisp for passage
        const avoidanceStrength = Math.max(0, 1 - currentProg * 3.5);

        let hasActiveDisplacement = false;
        const radSq = repulsionRadius * repulsionRadius;

        for (let i = 0; i < voxels.length; i++) {
          const v = voxels[i];
          let targetDispX = 0;
          let targetDispY = 0;
          let targetDispZ = 0;

          if (targetMouse && avoidanceStrength > 0.01) {
            const dx = v.origX - targetMouse.x;
            const dy = v.origY - targetMouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < radSq && distSq > 0.0001) {
              const dist = Math.sqrt(distSq);
              // Non-linear falloff: cubes closest to cursor separate the most
              const ratio = 1 - dist / repulsionRadius;
              const force = Math.pow(ratio, 1.5) * maxDisplacement * avoidanceStrength;
              const nx = dx / dist;
              const ny = dy / dist;

              targetDispX = nx * force;
              targetDispY = ny * force;
              // Subtle 3D arching wave away from/towards viewer
              targetDispZ = Math.sin(ratio * Math.PI) * 2.0 * avoidanceStrength;
            }
          }

          // Damped spring return to exact logo rest position
          const springLerp = 0.15;
          v.dispX += (targetDispX - v.dispX) * springLerp;
          v.dispY += (targetDispY - v.dispY) * springLerp;
          v.dispZ += (targetDispZ - v.dispZ) * springLerp;

          if (Math.abs(v.dispX) > 0.002 || Math.abs(v.dispY) > 0.002 || Math.abs(v.dispZ) > 0.002 || targetDispX !== 0) {
            hasActiveDisplacement = true;
          }

          dummy.position.set(v.origX + v.dispX, v.origY + v.dispY, v.origZ + v.dispZ);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }

        if (hasActiveDisplacement || isPointerOverRef.current) {
          mesh.instanceMatrix.needsUpdate = true;
        }
      }

      // 2. Camera Fly-through & Idle Rotation
      if (mesh && cam) {
        // Subtle organic tilt smoothed as scroll progresses
        const straighten = Math.max(0, 1 - currentProg * 3.5);
        mesh.rotation.x = Math.sin(time * 0.9) * 0.06 * straighten;
        mesh.rotation.y = Math.cos(time * 0.7) * 0.08 * straighten;

        // Camera Z fly-through from startZ to -45 through (0,0,0) aperture
        const curStart = getStartCameraZ(cam.aspect);
        const endZ = -45;
        const curved = Math.pow(currentProg, 1.25);
        const curZ = curStart - curved * (curStart - endZ);

        cam.position.set(0, 0, curZ);
        cam.lookAt(0, 0, 0);

        if (curZ < 20 && curZ > -20) {
          cam.near = 0.05;
          cam.updateProjectionMatrix();
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      if (currentProg >= 0.985 && !isFinishedRef.current) {
        finish(false);
      }
    };

    animate();

    // Timer for center slogan: visible for 2.6s while 3D emblem is blurred,
    // then text fades away smoothly and emblem snaps into sharp focus!
    const textTimer = setTimeout(() => {
      setTextVisible(false);
      setLogoBlur(false);
    }, 2600);

    return () => {
      clearTimeout(textTimer);
      cancelAnimationFrame(animId);
      ro.disconnect();
      targetEventElement.removeEventListener('wheel', handleWheel);
      targetEventElement.removeEventListener('touchstart', handleTouchStart);
      targetEventElement.removeEventListener('touchmove', handleTouchMove);
      targetEventElement.removeEventListener('pointermove', handlePointerMove);
      targetEventElement.removeEventListener('pointerleave', handlePointerLeave);
      
      if (!embedded) {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', handleResize);
        document.documentElement.classList.remove('intro-locked');
        document.body.classList.remove('intro-locked');
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [embedded]);

  // Update material on theme toggle
  useEffect(() => {
    const isDark = effectiveTheme === 'dark';
    if (instancedMeshRef.current) {
      instancedMeshRef.current.material = getEmblemMaterial(isDark);
      instancedMeshRef.current.material.needsUpdate = true;
    }
  }, [effectiveTheme]);

  // Derived overlay opacities
  const heroOpacity = Math.max(0, 1 - progress * 2.8);
  const flyOpacity = Math.min(1, Math.max(0, (progress - 0.25) * 2.5)) * Math.max(0, 1 - (progress - 0.82) * 5.5);

  const handleUserInteract = () => {
    if (textVisible) {
      setTextVisible(false);
      setLogoBlur(false);
    }
  };

  const isDark = effectiveTheme === 'dark';

  return (
    <div
      ref={splashRef}
      onClick={(e) => {
        handleUserInteract();
        if (!e.target.closest('#intro-skip-btn') && !e.target.closest('#intro-lang-btn')) {
          flyThrough();
        }
      }}
      className={`${
        embedded 
          ? 'absolute inset-0 z-30 w-full h-full rounded-[42px]' 
          : 'fixed inset-0 z-[100] w-full h-full'
      } flex flex-col items-center justify-between bg-[#f8fafc] dark:bg-[#121212] transition-colors duration-500 overflow-hidden select-none cursor-pointer`}
    >
      {/* 3D WebGL Canvas Layer with Depth-of-Field Blur Transition */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-700 ease-out"
        style={{
          filter: logoBlur ? 'blur(12px)' : 'blur(0px)',
          opacity: logoBlur ? (isDark ? 0.45 : 0.22) : 1
        }}
      />

      {/* Top Bar with UNITBV & TSG + Bilingual Language Switcher + Skip Button */}
      <div className={`relative z-10 w-full ${embedded ? 'pt-11 px-4 max-w-full' : 'pt-4 px-4 sm:pt-6 sm:px-6 max-w-[1440px]'} mx-auto flex items-center justify-between gap-2`}>
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <img 
            src="/assets/branding/unitbv-logo.png" 
            alt="UNITBV" 
            className={`${embedded ? 'h-5 max-w-[78px]' : 'h-5 sm:h-7 max-w-[95px] sm:max-w-[140px]'} w-auto object-contain dark:invert dark:brightness-200 transition-all shrink-0`} 
          />
          <div className={`${embedded ? 'h-3.5' : 'h-4 sm:h-4.5'} w-[1px] bg-slate-300 dark:bg-white/20 shrink-0`} />
          {/* TSG Logo - Light Mode */}
          <img 
            src="/assets/branding/tsg-logo-clean.png" 
            alt="TSG" 
            className={`${embedded ? 'h-3.5 max-w-[44px]' : 'h-3.5 sm:h-5 max-w-[48px] sm:max-w-[72px]'} w-auto object-contain shrink-0 dark:hidden block transition-all`} 
          />
          {/* TSG Logo - Dark Mode (White Logo) */}
          <img 
            src="/assets/branding/tsg-logo-white.png" 
            alt="TSG" 
            className={`${embedded ? 'h-3.5 max-w-[44px]' : 'h-3.5 sm:h-5 max-w-[48px] sm:max-w-[72px]'} w-auto object-contain shrink-0 dark:block hidden transition-all`} 
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Direct Language Switcher in Intro */}
          <button
            id="intro-lang-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleLang();
            }}
            className={`flex items-center gap-1 ${
              embedded ? 'px-2 py-1 text-[10px]' : 'px-3.5 py-1.5 text-xs'
            } rounded-full font-bold bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-amber-400 transition shadow-sm active:scale-95`}
            title="Schimbă limba / Switch language"
          >
            <span>{lang === 'ro' ? '🇷🇴' : '🇬🇧'}</span>
            <span>{lang.toUpperCase()}</span>
          </button>

          <button
            id="intro-skip-btn"
            onClick={(e) => {
              e.stopPropagation();
              finish(true);
            }}
            className={`${
              embedded ? 'px-2.5 py-1 text-[10px]' : 'px-4 py-1.5 text-xs'
            } rounded-full font-bold bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-amber-400 transition shadow-sm active:scale-95`}
          >
            {t('introSkip', 'Sari')} ➔
          </button>
        </div>
      </div>

      {/* Center Slogan Overlay: FLOATING TYPOGRAPHY (Prestigious Clean Typography on Light Mode / Deep 3D Shadow on Dark Mode) */}
      <div
        className={`relative z-10 text-center ${embedded ? 'max-w-[320px] px-3' : 'max-w-2xl px-6'} pointer-events-none transition-all duration-700 ease-out`}
        style={{
          opacity: textVisible ? heroOpacity : 0,
          transform: `translateY(${progress * -35 + (textVisible ? 0 : -25)}px) scale(${textVisible ? 1 : 0.95})`,
          pointerEvents: textVisible ? 'auto' : 'none'
        }}
      >
        <div 
          className="space-y-4 py-4 px-6 transition-all duration-500"
          style={{
            background: 'none',
            boxShadow: 'none'
          }}
        >
          {/* Subtle floating partnership pill */}
          <div className={`inline-flex items-center gap-2 ${embedded ? 'text-[9px] px-3 py-1' : 'text-[10px] sm:text-xs px-4 py-1.5'} font-bold tracking-wider uppercase rounded-full text-slate-800 dark:text-amber-300 bg-white/95 dark:bg-amber-400/10 backdrop-blur-md border border-slate-200/90 dark:border-amber-400/20 shadow-sm transition-all`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-xs shrink-0" />
            <span>{t('introPartnership', 'Parteneriat Oficial · Transilvania Star Group (TSG)')}</span>
          </div>

          {/* Main Motto: Clean, authoritative, razor-sharp typography in 2 colors:
              - Light Mode: Slate-900 ("Învață să fii") + Official Blue #005A9C ("în centru!")
              - Dark Mode: Pure White ("Învață să fii") + Radiant Gold Amber-400 ("în centru!")
          */}
          <h1
            className={`${
              embedded ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl md:text-6xl'
            } font-black font-heading leading-tight tracking-tight text-slate-900 dark:text-white select-none transition-all duration-300`}
            style={{
              textShadow: isDark
                ? '0 4px 20px rgba(0, 0, 0, 0.95), 0 10px 40px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 158, 11, 0.35)'
                : '0 0 20px #ffffff, 0 0 35px #ffffff, 0 0 50px rgba(255, 255, 255, 0.95), 0 2px 4px rgba(255, 255, 255, 1)',
              filter: isDark
                ? 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 16px rgba(245, 158, 11, 0.3))'
                : 'drop-shadow(0 0 25px rgba(255, 255, 255, 1)) drop-shadow(0 2px 6px rgba(255, 255, 255, 0.9))'
            }}
          >
            {lang === 'ro' ? (
              <>Învață să fii <span className="text-[#005A9C] dark:text-amber-400 font-black">în centru!</span></>
            ) : (
              <>Learn to be <span className="text-[#005A9C] dark:text-amber-400 font-black">in the center!</span></>
            )}
          </h1>

          {/* Subtitle with crystal-clear readability */}
          <p
            className={`${
              embedded ? 'text-[11px] leading-snug max-w-[270px]' : 'text-xs sm:text-sm md:text-base leading-relaxed max-w-lg'
            } font-bold mx-auto text-slate-800 dark:text-slate-200 select-none transition-all duration-300`}
            style={{
              textShadow: isDark
                ? '0 2px 12px rgba(0, 0, 0, 0.95), 0 6px 25px rgba(0, 0, 0, 0.9)'
                : '0 0 16px #ffffff, 0 0 30px #ffffff, 0 1px 4px rgba(255, 255, 255, 1)',
              filter: isDark
                ? 'drop-shadow(0 4px 14px rgba(0, 0, 0, 0.9))'
                : 'drop-shadow(0 0 12px rgba(255, 255, 255, 1))'
            }}
          >
            {t('introDescription', 'Pășește prin centrul simbolului universitar în universul academic și evenimentele campusului.')}
          </p>
        </div>
      </div>

      {/* Fly through text when active */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{ opacity: flyOpacity }}
      >
        <span
          className={`${
            embedded ? 'text-lg' : 'text-2xl sm:text-4xl'
          } font-black font-heading text-amber-500 tracking-wider uppercase animate-pulse select-none`}
          style={{
            textShadow: isDark
              ? '0 0 30px rgba(0,0,0,0.9)'
              : '0 0 30px rgba(245,158,11,0.8)'
          }}
        >
          {t('introEnterHub', 'Bun venit la UNITBV Connect')}
        </span>
      </div>

      {/* Bottom Scroll / Swipe Cue */}
      <div
        className={`relative z-10 flex flex-col items-center ${embedded ? 'pb-6' : 'pb-8'} pointer-events-auto transition-opacity duration-500`}
        style={{ opacity: textVisible ? heroOpacity : 0.85 }}
      >
        <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>{embedded ? t('introSwipeToEnter', 'Glisează în sus pentru a intra') : t('introScrollToEnter', 'Derulează pentru a intra în campus')}</span>
          </div>

          {/* Mouse / Swipe Icon */}
          <div className="w-5 h-8 rounded-full border-2 border-slate-400 dark:border-slate-500 flex items-start justify-center p-1 group-hover:border-amber-400 transition">
            <div className="w-1 h-2 rounded-full bg-amber-500 animate-bounce" />
          </div>

          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            {embedded ? t('introClickToEnterMobile', 'sau apasă pentru zbor prin logo') : t('introClickOrScroll', 'sau apasă oriunde pentru a zbura prin logo')}
          </span>
        </div>
      </div>
    </div>
  );
}
