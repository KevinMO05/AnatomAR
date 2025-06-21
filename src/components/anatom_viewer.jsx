import React, { useState } from 'react';
import ChatBot from './chatbot';

const SketchfabViewer = ({ embedUrl, title, className = "" }) => {
  return (
    <div className={`relative rounded-lg border border-gray-200 bg-white shadow-inner overflow-hidden ${className}`}>
      <iframe
        title={title}
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        width="100%"
        height="100%"
        src={embedUrl}
        className="w-full h-full"
      />
    </div>
  );
};

const AnatomyViewer = () => {
  const [selectedBone, setSelectedBone] = useState('frontal');
  const [showChatBot, setShowChatBot] = useState(false);

  // URLs de embed de Sketchfab para cada hueso
  const sketchfabEmbeds = {
    skull: "https://sketchfab.com/models/baf6ac7b781a46218dca2b59dee58817/embed?autostart=1", // Reemplaza con tu URL
    frontal: "https://sketchfab.com/models/b8a462158501416dbde8f924067d325f/embed?autostart=1",
    parietal: "https://sketchfab.com/models/a1253109d8a1474bbbeed716227ba586/embed?autostart=1",
    temporal: "https://sketchfab.com/models/8dec765f703d45fbb14460bbaa106c1c/embed?autostart=1",
    occipital: "https://sketchfab.com/models/f7b9dd2827a14e9999b01d2aeb794c12/embed?autostart=1",
    maxilla: "https://sketchfab.com/models/cbcbc30694c84f1c9f3ecfc57a635020/embed?autostart=1",
    mandible: "https://sketchfab.com/models/1d3eb1b070a44aa88e576fa5c0544c8d/embed?autostart=1",
    zygomatic: "https://sketchfab.com/models/2f28f3a686d84b69b3a36b9e1cf781b4/embed?autostart=1",
  };

  // Datos de los huesos del cráneo
  const skullBones = [
    { id: 'frontal', name: 'Frontal', color: '#ff6b6b' },
    { id: 'parietal', name: 'Parietal', color: '#4ecdc4' },
    { id: 'temporal', name: 'Temporal', color: '#45b7d1' },
    { id: 'occipital', name: 'Occipital', color: '#96ceb4' },
    { id: 'maxilla', name: 'Maxilar', color: '#f7dc6f' },
    { id: 'mandible', name: 'Mandíbula', color: '#bb8fce' },
    { id: 'zygomatic', name: 'Cigomático', color: '#85c1e9' },
  ];

  const boneDescriptions = {
    frontal: "El hueso frontal forma la frente y la parte superior de las órbitas oculares. Protege el lóbulo frontal del cerebro.",
    parietal: "Los huesos parietales forman la mayor parte de los lados y la parte superior del cráneo.",
    temporal: "El hueso temporal se encuentra en los lados del cráneo y contiene el oído interno.",
    occipital: "El hueso occipital forma la parte posterior e inferior del cráneo.",
    maxilla: "El maxilar forma la mandíbula superior y sostiene los dientes superiores.",
    mandible: "La mandíbula es el hueso móvil de la mandíbula inferior.",
    zygomatic: "El cigomático forma el pómulo y parte de la órbita ocular.",
  };

  const handleChatWithAI = () => {
    setShowChatBot(true);
  };

  const handleCloseChatBot = () => {
    setShowChatBot(false);
  };

  const selectedBoneData = skullBones.find(bone => bone.id === selectedBone);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explorador de Anatomía Humana
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cada órgano/sistema del cuerpo humano con nuestro visualizador 3D interactivo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Panel de información - Izquierda */}
          <div className="space-y-6">
            
            {/* Información del modelo */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Cráneo Humano
              </h3>
              <p className="text-gray-600 mb-4">
                El cráneo humano está compuesto por 22 huesos que protegen el cerebro 
                y forman la estructura de la cabeza. Explora cada hueso individualmente 
                para entender su función y ubicación.
              </p>
              
              {/* Información del hueso seleccionado */}
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedBoneData?.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {boneDescriptions[selectedBone]}
                </p>
              </div>
            </div>

            {/* Partes del modelo */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Huesos del Cráneo
              </h4>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {skullBones.map((bone) => (
                  <button
                    key={bone.id}
                    onClick={() => setSelectedBone(bone.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedBone === bone.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: bone.color }}
                      />
                      <span>{bone.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Botón para chatear con IA */}
            {!showChatBot ? (
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      ¿Tienes preguntas?
                    </h4>
                    <p className="text-sm opacity-90">
                      Chatea con nuestra IA especializada en anatomía
                    </p>
                  </div>
                  <button
                    onClick={handleChatWithAI}
                    className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Chatear</span>
                  </button>
                </div>
              </div>
            ) : (
              <ChatBot onClose={handleCloseChatBot} />
            )}
          </div>

          {/* Visualizadores 3D - Derecha */}
          <div className="space-y-6">
            
            {/* Cráneo completo */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Cráneo Completo
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Interactivo</span>
                </div>
              </div>
              
              <SketchfabViewer
                embedUrl={sketchfabEmbeds.skull}
                title="Cráneo Humano Completo"
                className="h-[350px]"
              />
            </div>

            {/* Hueso seleccionado */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {selectedBoneData?.name}
                </h4>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedBoneData?.color }}
                  />
                  <span className="text-sm text-gray-500">Hueso individual</span>
                </div>
              </div>
              
              <SketchfabViewer
                embedUrl={sketchfabEmbeds[selectedBone]}
                title={`Hueso ${selectedBoneData?.name}`}
                className="h-[350px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnatomyViewer;