import React from 'react'

export type RouteOpts = {
  title: string;
  path: string;
  component: React.ComponentType<any>;
  icon: React.ComponentType<any>;
}
