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


export interface ProductsSlice {
  planets: Planet[];
  solarSystems: SolarSystem[];
  galaxies: Galaxy[];
  addPlanets: (planets: Planet[]) => void;
  addSolarSystems: (solarSystems: SolarSystem[]) => void;
  addGalaxies: (galaxies: Galaxy[]) => void;
}
