export interface Planet {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  href: string;
}

export interface SolarSystem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  href: string;
}

export interface Galaxy {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  href: string;
}

export interface Products {
  planets: Planet[];
  solarSystems: SolarSystem[];
  galaxies: Galaxy[];
  addPlanets: (planets: Planet[]) => void;
  addSolarSystems: (solarSystems: SolarSystem[]) => void;
  addGalaxies: (galaxies: Galaxy[]) => void;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: any;
}

export interface ProductState {
  all: Product[];
  planets: Product[];
  solars: Product[];
  galaxies: Product[];
}
