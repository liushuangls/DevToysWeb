import React from 'react'

export type RouteOpts = {
  title: string;
  path: string;
  key: string;
  group?: string;
  component: React.ComponentType<any>;
  icon: React.ComponentType<any>;
}
