"use client";

import dynamic from 'next/dynamic';

export const DynamicParticles = dynamic(
  () => import('@/components/three/particles-background').then(mod => mod.ParticlesBackground),
  { ssr: false }
);

export const DynamicAiWidget = dynamic(
  () => import('@/modules/ai-assistant/ai-chat-widget').then((mod) => mod.AiChatWidget),
  { ssr: false }
);
