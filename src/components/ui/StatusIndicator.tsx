import React from 'react'
import { cn } from '@/lib/utils'

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'error'
  label?: string
  showDot?: boolean
  className?: string
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  showDot = true,
  className
}) => {
  const statusConfig = {
    online: {
      color: 'text-green-600',
      dotColor: 'bg-green-500',
      defaultLabel: 'Online'
    },
    offline: {
      color: 'text-gray-400',
      dotColor: 'bg-gray-400',
      defaultLabel: 'Offline'
    },
    warning: {
      color: 'text-yellow-600',
      dotColor: 'bg-yellow-500',
      defaultLabel: 'Warning'
    },
    error: {
      color: 'text-red-600',
      dotColor: 'bg-red-500',
      defaultLabel: 'Error'
    }
  }

  const config = statusConfig[status]
  const displayLabel = label || config.defaultLabel

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {showDot && (
        <div
          className={cn(
            'w-3 h-3 rounded-full',
            config.dotColor,
            status === 'online' && 'animate-pulse'
          )}
        />
      )}
      <span className={cn('text-sm font-medium', config.color)}>
        {displayLabel}
      </span>
    </div>
  )
}

interface ConnectionStatusProps {
  status: 'connected' | 'connecting' | 'disconnected'
  className?: string
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  status,
  className
}) => {
  const statusMap = {
    connected: 'online' as const,
    connecting: 'warning' as const,
    disconnected: 'offline' as const
  }

  const labels = {
    connected: 'Connected',
    connecting: 'Connecting...',
    disconnected: 'Disconnected'
  }

  return (
    <StatusIndicator
      status={statusMap[status]}
      label={labels[status]}
      className={className}
    />
  )
}
