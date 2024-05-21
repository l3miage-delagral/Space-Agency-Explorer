
export interface Pad {
    id: number;
    url: string;
    agency_id?: number;
    name: string;
    description?: string;
    info_url?: string;
    wiki_url: string;
    map_url: string;
    latitude: number;
    longitude: number;
    location: Location;
    country_code: string;
    map_image: string;
    total_launch_count: number;
    orbital_launch_count: number;
}

export interface Location {
    id: number;
    url: string;
    name: string;
    country_code: string;
    description: string;
    map_image: string;
    timezone_name: string;
    total_launch_count: number;
    total_landing_count: number;
}