/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Material {
  id: string;
  name: string;
  category: 'stone' | 'wood' | 'metal' | 'fabric';
  description: string;
  origin: string;
  image: string;
  finishes: string[];
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  imageUrl: string;
  secondaryImages: string[];
  materials: string[];
  details: string[];
}

export interface Service {
  id: string;
  name: string;
  category: 'core' | 'living' | 'fittings' | 'commercial';
  description: string;
  icon: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  details: string;
  budget: string;
  timeframe: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'archived';
}
