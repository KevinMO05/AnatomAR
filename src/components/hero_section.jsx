import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const HeroSection = ({ onExplorarClick }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current || viewerRef.current.children.length > 0) return;
    if (!viewerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      viewerRef.current.clientWidth / viewerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      viewerRef.current.clientWidth,
      viewerRef.current.clientHeight
    );
    viewerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.load(
      "/models/book_anatomy.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        scene.add(model);

        let mixer = null;
        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);
          const delta = clock.getDelta();
          if (mixer) mixer.update(delta);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("Error al cargar el modelo:", error);
      }
    );

    return () => {
      if (viewerRef.current && renderer.domElement) {
        viewerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="py-10 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout unificado que funciona para mobile y desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Vista 3D - Aparece primero en mobile, segundo en desktop */}
          <div className="order-1 lg:order-2 flex justify-center w-full">
            <div className="relative w-full max-w-sm h-80 sm:max-w-md sm:h-96 lg:w-[500px] lg:h-[500px]">
              <div
                ref={viewerRef}
                className="w-full h-full relative z-10"
                style={{ pointerEvents: "auto" }}
              />
            </div>
          </div>

          {/* Contenido de texto - Aparece segundo en mobile, primero en desktop */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6 lg:space-y-8 lg:ml-10">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Aprende Anatomía
                <span className="block text-blue-600">
                  de forma interactiva
                </span>
              </h1>
              <p className="mt-4 lg:mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Explora el cuerpo humano como nunca antes lo habías hecho.
                Modelos 3D interactivos que te permiten estudiar cada detalle de
                la anatomía humana.
              </p>
            </div>

            {/* Features - Layout responsive */}
            <div className="space-y-4 lg:space-y-4">
              {/* Para mobile/tablet: layout horizontal compacto */}
              <div className="flex flex-col sm:flex-row lg:hidden justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0">
                <div className="flex flex-col items-center text-center sm:flex-1">
                  <div className="w-12 h-12 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <svg
                      className="w-6 h-6 sm:w-6 sm:h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-base font-semibold text-gray-900 mb-1">
                    Modelos 3D
                  </h3>
                  <p className="text-md sm:text-sm text-gray-600">
                    Visualiza en detalle
                  </p>
                </div>

                <div className="flex flex-col items-center text-center sm:flex-1">
                  <div className="w-12 h-12 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <svg
                      className="w-6 h-6 sm:w-6 sm:h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-base font-semibold text-gray-900 mb-1">
                    Asistente IA
                  </h3>
                  <p className="text-md sm:text-sm text-gray-600">
                    Pregunta dudas
                  </p>
                </div>

                <div className="flex flex-col items-center text-center sm:flex-1">
                  <div className="w-12 h-12 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <svg
                      className="w-6 h-6 sm:w-6 sm:h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6V4.5a1.5 1.5 0 00-1.5-1.5H5a2 2 0 00-2 2V18a2 2 0 002 2h5.5A1.5 1.5 0 0012 18.5V17M12 6v11m0-11v11m0 0v1.5a1.5 1.5 0 001.5 1.5H19a2 2 0 002-2V5a2 2 0 00-2-2h-5.5A1.5 1.5 0 0012 4.5V6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-base font-semibold text-gray-900 mb-1">
                    Libro Físico
                  </h3>
                  <p className="text-md sm:text-sm text-gray-600">
                    Lee y observa
                  </p>
                </div>
              </div>

              {/* Para desktop: layout vertical con más espacio */}
              <div className="hidden lg:block space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Modelos 3D Detallados
                    </h3>
                    <p className="text-gray-600">
                      Visualiza cada hueso, músculo y órgano en detalle
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Asistente IA
                    </h3>
                    <p className="text-gray-600">
                      Pregunta cualquier duda sobre anatomía
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6V4.5a1.5 1.5 0 00-1.5-1.5H5a2 2 0 00-2 2V18a2 2 0 002 2h5.5A1.5 1.5 0 0012 18.5V17M12 6v11m0-11v11m0 0v1.5a1.5 1.5 0 001.5 1.5H19a2 2 0 002-2V5a2 2 0 00-2-2h-5.5A1.5 1.5 0 0012 4.5V6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Libro Físico
                    </h3>
                    <p className="text-gray-600">
                      Aprende leyendo y observando en modelos 3D
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={onExplorarClick} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200"
              >
                Comenzar Exploración
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;