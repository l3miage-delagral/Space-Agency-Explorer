
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

export interface Event {
    id: number;
    url: string;
    slug: string;
    name: string;
    updates: [any];
    last_updated: string;
    type: Type;
    description: string;
    webcast_live: boolean;
    location: string;
    news_url?: string;
    video_url?: string;
    info_url: [any];
    vid_urls: [any];
    feature_image: string;
    date: string;
    date_precision?: string;
    duration?: string;
    agencies: [any];
    launches: [any];
    expeditions: [any];
    spacestations: [any];
    program: [any];
}

export interface Type {
    id: number;
    name: string;
}