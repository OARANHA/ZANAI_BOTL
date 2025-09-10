import React, { useState } from 'react';
import { Switch } from '~/components/ui/Switch';
import { Button } from '~/components/ui/Button';
import { Card } from '~/components/ui/Card';
import { Badge } from '~/components/ui/Badge';
import { Tooltip } from '~/components/ui/Tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/Collapsible';
import { 
  VideoCameraIcon, 
  MicrophoneIcon, 
  DocumentTextIcon, 
  PhotoIcon, 
  CodeBracketIcon, 
  UserGroupIcon, 
  ViewfinderCircleIcon, 
  SpeakerWaveIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import type { EnhancedMultimodalCapabilities, MultimodalContext } from '~/lib/common/prompts/enhanced-multimodal';

interface MultimodalControlsProps {
  capabilities: EnhancedMultimodalCapabilities;
  onCapabilitiesChange: (capabilities: EnhancedMultimodalCapabilities) => void;
  context?: MultimodalContext;
  onContextChange?: (context: MultimodalContext) => void;
  className?: string;
}

const capabilityDescriptions = {
  videoAnalysis: {
    title: 'Análise de Vídeo',
    description: 'Processamento de conteúdo de vídeo, reconhecimento de movimento e análise temporal',
    icon: VideoCameraIcon,
    color: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  audioTranscription: {
    title: 'Transcrição de Áudio',
    description: 'Conversão de fala para texto, análise de áudio e reconhecimento de padrões sonoros',
    icon: MicrophoneIcon,
    color: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  documentUnderstanding: {
    title: 'Compreensão de Documentos',
    description: 'Análise semântica de PDFs, Word, Excel e outros formatos de documentos',
    icon: DocumentTextIcon,
    color: 'bg-green-100 text-green-800 border-green-300'
  },
  imageRecognition: {
    title: 'Reconhecimento de Imagem',
    description: 'Visão computacional avançada, detecção de objetos e análise de cenas',
    icon: PhotoIcon,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  },
  codeContextAnalysis: {
    title: 'Análise de Contexto de Código',
    description: 'Análise profunda de codebase, reconhecimento de padrões e insights arquiteturais',
    icon: CodeBracketIcon,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  realTimeCollaboration: {
    title: 'Colaboração em Tempo Real',
    description: 'Sessões multiusuário com sincronização e edição colaborativa',
    icon: UserGroupIcon,
    color: 'bg-red-100 text-red-800 border-red-300'
  },
  arIntegration: {
    title: 'Integração AR/VR',
    description: 'Realidade aumentada, overlays 3D e interações espaciais',
    icon: ViewfinderCircleIcon,
    color: 'bg-pink-100 text-pink-800 border-pink-300'
  },
  voiceCommands: {
    title: 'Comandos de Voz',
    description: 'Controle por voz, reconhecimento de linguagem natural e feedback auditivo',
    icon: SpeakerWaveIcon,
    color: 'bg-teal-100 text-teal-800 border-teal-300'
  }
};

export const MultimodalControls: React.FC<MultimodalControlsProps> = ({
  capabilities,
  onCapabilitiesChange,
  context,
  onContextChange,
  className = ''
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [activeCapabilitiesCount, setActiveCapabilitiesCount] = useState(
    Object.values(capabilities).filter(Boolean).length
  );

  const handleCapabilityToggle = (capability: keyof EnhancedMultimodalCapabilities) => {
    const newCapabilities = {
      ...capabilities,
      [capability]: !capabilities[capability]
    };
    
    onCapabilitiesChange(newCapabilities);
    setActiveCapabilitiesCount(Object.values(newCapabilities).filter(Boolean).length);
  };

  const handleContextChange = (field: keyof MultimodalContext, value: any) => {
    if (onContextChange) {
      onContextChange({
        ...context,
        [field]: value
      });
    }
  };

  const enableAllCapabilities = () => {
    const allCapabilities: EnhancedMultimodalCapabilities = {
      videoAnalysis: true,
      audioTranscription: true,
      documentUnderstanding: true,
      imageRecognition: true,
      codeContextAnalysis: true,
      realTimeCollaboration: true,
      arIntegration: true,
      voiceCommands: true
    };
    onCapabilitiesChange(allCapabilities);
    setActiveCapabilitiesCount(8);
  };

  const disableAllCapabilities = () => {
    const noCapabilities: EnhancedMultimodalCapabilities = {
      videoAnalysis: false,
      audioTranscription: false,
      documentUnderstanding: false,
      imageRecognition: false,
      codeContextAnalysis: false,
      realTimeCollaboration: false,
      arIntegration: false,
      voiceCommands: false
    };
    onCapabilitiesChange(noCapabilities);
    setActiveCapabilitiesCount(0);
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Controles Multimodais
              </h3>
            </div>
            <Badge 
              variant="secondary" 
              className={`${activeCapabilitiesCount > 0 ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}
            >
              {activeCapabilitiesCount} ativas
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={enableAllCapabilities}
              className="text-xs"
            >
              Ativar todas
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={disableAllCapabilities}
              className="text-xs"
            >
              Desativar todas
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(capabilityDescriptions).slice(0, 4).map(([key, config]) => {
            const Icon = config.icon;
            const isEnabled = capabilities[key as keyof EnhancedMultimodalCapabilities];
            
            return (
              <Tooltip key={key} content={config.description}>
                <div 
                  className={`
                    p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                    ${isEnabled ? config.color + ' border-current shadow-sm' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}
                  `}
                  onClick={() => handleCapabilityToggle(key as keyof EnhancedMultimodalCapabilities)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${isEnabled ? 'currentColor' : 'text-gray-400'}`} />
                    <Switch
                      checked={isEnabled}
                      onChange={() => {}}
                      className="scale-75"
                    />
                  </div>
                  <div className="text-xs font-medium text-gray-900">
                    {config.title}
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>

        {/* Advanced Controls */}
        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between">
              <span className="flex items-center space-x-2">
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                <span>Controles Avançados</span>
              </span>
              <InformationCircleIcon className="w-4 h-4 text-gray-400" />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Remaining Capabilities */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(capabilityDescriptions).slice(4).map(([key, config]) => {
                const Icon = config.icon;
                const isEnabled = capabilities[key as keyof EnhancedMultimodalCapabilities];
                
                return (
                  <Tooltip key={key} content={config.description}>
                    <div 
                      className={`
                        p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${isEnabled ? config.color + ' border-current shadow-sm' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}
                      `}
                      onClick={() => handleCapabilityToggle(key as keyof EnhancedMultimodalCapabilities)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${isEnabled ? 'currentColor' : 'text-gray-400'}`} />
                        <Switch
                          checked={isEnabled}
                          onChange={() => {}}
                          className="scale-75"
                        />
                      </div>
                      <div className="text-xs font-medium text-gray-900">
                        {config.title}
                      </div>
                    </div>
                  </Tooltip>
                );
              })}
            </div>

            {/* Context Configuration */}
            {context && onContextChange && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Configuração de Contexto
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tipo de Mídia
                    </label>
                    <select
                      value={context.currentMediaType || ''}
                      onChange={(e) => handleContextChange('currentMediaType', e.target.value || undefined)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Não especificado</option>
                      <option value="video">Vídeo</option>
                      <option value="audio">Áudio</option>
                      <option value="image">Imagem</option>
                      <option value="document">Documento</option>
                      <option value="code">Código</option>
                      <option value="3d">3D</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tipo de Dispositivo
                    </label>
                    <select
                      value={context.environmentalContext?.deviceType || ''}
                      onChange={(e) => handleContextChange('environmentalContext', {
                        ...context.environmentalContext,
                        deviceType: e.target.value as any || undefined
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Não especificado</option>
                      <option value="desktop">Desktop</option>
                      <option value="mobile">Mobile</option>
                      <option value="tablet">Tablet</option>
                      <option value="vr">VR</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Condições de Rede
                    </label>
                    <select
                      value={context.environmentalContext?.networkConditions || ''}
                      onChange={(e) => handleContextChange('environmentalContext', {
                        ...context.environmentalContext,
                        networkConditions: e.target.value as any || undefined
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Não especificado</option>
                      <option value="fast">Rápida</option>
                      <option value="medium">Média</option>
                      <option value="slow">Lenta</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={context.environmentalContext?.accessibility || false}
                      onChange={(checked) => handleContextChange('environmentalContext', {
                        ...context.environmentalContext,
                        accessibility: checked
                      })}
                    />
                    <label className="text-xs font-medium text-gray-700">
                      Modo Acessibilidade
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Status Summary */}
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <InformationCircleIcon className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">
                  Status das Capacidades
                </span>
              </div>
              <div className="text-xs text-purple-700">
                {activeCapabilitiesCount === 0 ? (
                  'Nenhuma capacidade multimodal ativada. Ative as capacidades acima para habilitar funções avançadas.'
                ) : activeCapabilitiesCount === 1 ? (
                  '1 capacidade multimodal ativada. O sistema usará prompts aprimorados para esta função.'
                ) : (
                  `${activeCapabilitiesCount} capacidades multimodais ativadas. O sistema usará prompts avançados com suporte completo a múltiplos formatos.`
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Card>
  );
};