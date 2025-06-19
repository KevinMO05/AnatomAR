import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Viewer = ({ modelPath, autoRotate = true }) => {
  const mountRef = useRef(null);
  const mixerRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.8;
    controlsRef.current = controls;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    const loader = new GLTFLoader();
    let model = null;

    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;

        // Centrado del modelo
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.scale.set(1.5, 1.5, 1.5);
        scene.add(model);

        // Animaciones
        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
          mixerRef.current = mixer;
        }
      },
      undefined,
      (error) => {
        console.error("Error al cargar el modelo:", error);
      }
    );

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixerRef.current) mixerRef.current.update(delta);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animate);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      controls.dispose();

      if (model) {
        scene.remove(model);
        model.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [modelPath, autoRotate]);

  return (
    <div
      ref={mountRef}
      className="w-full h-96 rounded-lg border border-gray-200 bg-white shadow-inner"
    />
  );
};

const SkullViewer3D = ({ selectedBone, bones }) => {
  const selectedBoneData = bones.find((b) => b.id === selectedBone);

  return (
    <div className="flex flex-col gap-6">
      {/* Cráneo completo */}
      <div className="relative h-[400px] rounded-lg border border-gray-200 bg-white shadow-inner overflow-hidden">
        <Viewer modelPath="/models/skull.glb" autoRotate={true} />

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <span>Arrastra: Rotar | Scroll: Zoom</span>
          </div>
        </div>
      </div>

      {/* Parte seleccionada */}
      {selectedBone && selectedBoneData && (
        <div className="relative h-[400px] rounded-lg border border-gray-200 bg-white shadow-inner overflow-hidden">
          <Viewer modelPath={`/models/${selectedBone}.glb`} autoRotate={true} />

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: `#${selectedBoneData.color
                    .toString(16)
                    .padStart(6, "0")}`,
                }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {selectedBoneData.name}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkullViewer3D;
