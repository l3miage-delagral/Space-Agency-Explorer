
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
    location?: Location;
    country_code: string;
    map_image: string;
    total_launch_count: number;
    orbital_launch_count: number;
    orbital_launch_attempt_count: number;
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

export interface Launch {
    id: string;
    url: string;
    slug: string;
    name: string;
    status: Status;
    last_updated: string;
    net: string;
    window_end: string;
    window_start: string;
    inhold: boolean;
    tbdtime: boolean;
    tbddate: boolean;
    probability?: number;
    holdreason?: string;
    failreason?: string;
    hashtag?: string;
    launch_service_provider: Agency;
    rocket: Rocket;
    mission: Mission;
    pad: Pad;
    infoURLs: InfoURL[];
    vidURLs: VidURL[];
    webcast_live: boolean;
    image: string;
    infographic?: string;
    program: Program[];
    orbital_launch_attempt_count: number;
    location_launch_attempt_count: number;
    pad_launch_attempt_count: number;
    agency_launch_attempt_count: number;
    orbital_launch_attempt_count_year: number;
    location_launch_attempt_count_year: number;
    pad_launch_attempt_count_year: number;
    agency_launch_attempt_count_year: number;
}

export interface Status {
    id: number;
    name: string;
}

export interface Rocket {
    id: number;
    configuration: RocketConfiguration;
    spacecraft_stage?: SpacecraftStage | null;
    launcher_stage?: string; 
}

export interface RocketConfiguration {
    id: number;
    url: string;
    name: string;
    active: boolean;
    reusable: boolean;
    description: string;
    family: string;
    full_name: string;
    manufacturer: Manufacturer;
    program: any[];  // assuming program is an array, you might need to define its type more specifically
    variant: string;
    alias: string;
    min_stage: number;
    max_stage: number;
    length: number | null;
    diameter: number | null;
    maiden_flight: string;
    launch_cost: number | null;
    launch_mass: number | null;
    leo_capacity: number | null;
    gto_capacity: number | null;
    to_thrust: number | null;
    apogee: number | null;
    vehicle_range: number | null;
    image_url: string;
    info_url: string | null;
    wiki_url: string | null;
    total_launch_count: number;
    consecutive_successful_launches: number;
    successful_launches: number;
    failed_launches: number;
    pending_launches: number;
    attempted_landings: number;
    successful_landings: number;
    failed_landings: number;
    consecutive_successful_landings: number;
}

export interface Manufacturer {
    id: number;
    url: string;
    name: string;
    featured: boolean;
    type: string;
    country_code: string;
    abbrev: string;
    description: string | null;
    administrator: string | null;
    founding_year: string;
    launchers: string;
    spacecraft: string;
    launch_library_url: string | null;
    total_launch_count: number;
    consecutive_successful_launches: number;
    successful_launches: number;
    failed_launches: number;
    pending_launches: number;
    consecutive_successful_landings: number;
    successful_landings: number;
    failed_landings: number;
    attempted_landings: number;
    info_url: string | null;
    wiki_url: string;
    logo_url: string | null;
    image_url: string | null;
    nation_url: string | null;
}

export interface SpacecraftStage {
    id: number;
    url: string;
    mission_end: string;
    destination: string;
    spacecraft: Spacecraft;
    launch_crew: CrewMember[];
    onboard_crew: CrewMember[];
    landing_crew: CrewMember[];
}

export interface Spacecraft {
    id: number;
    name: string;
    serial_number: string;
    status: SpacecraftStatus;
    description: string;
    spacecraft_config: SpacecraftConfiguration;
}

export interface SpacecraftStatus {
    id: number;
    name: string;
}

export interface SpacecraftConfiguration {
    id: number;
    url: string;
    name: string;
    type: string;
    agency: Agency;
}

export interface CrewMember {
    id: number;
    role: string;
    astronaut: Astronaut;
}

export interface Astronaut {
    id: number;
    name: string;
    status: AstronautStatus;
    date_of_birth: string;
    date_of_death?: string;
    nationality: string;
    bio: string;
    twitter?: string;
    instagram?: string;
    wiki?: string;
    agency: Agency;
}

export interface AstronautStatus {
    id: number;
    name: string;
}

export interface Agency {
    "id": number,
    "url"?: string,
    "name": string,
    "featured": boolean,
    "type": string,
    "country_code"?: string,
    "abbrev": string,
    "description": string,
    "administrator"?: string,
    "founding_year"?: string,
    "launchers"?: string,
    "spacecraft"?: string,
    "launch_library_url"?: string,
    "total_launch_count"?: number,
    "consecutive_successful_launches"?: number,
    "successful_launches"?: number,
    "failed_launches"?: number,
    "pending_launches"?: number,
    "consecutive_successful_landings"?: number,
    "successful_landings": number,
    "failed_landings": number,
    "attempted_landings": number,
    "info_url": string,
    "wiki_url": string,
    "logo_url": string,
    "image_url": string,
    "nation_url": string,
}

export interface Mission {
    id: number;
    name: string;
    description: string;
    launch_designator: string;
    type: string;
    orbit: Orbit;
    agencies?: Agency[];
    infoURLs?: InfoURL[];
    vidURLs?: VidURL[];
}

export interface Orbit {
    id: number;
    name: string;
    abbrev: string;
}

export interface InfoURL {
    priority: number;
    title: string;
    description: string;
    feature_image: string;
    url: string;
}

export interface VidURL {
    priority: number;
    source: string;
    publisher: string;
    title: string;
    description: string;
    feature_image: string;
    url: string;
    type: string;
    language: string;
    start_time: string;
    end_time: string;
}

export interface Program {
    id: number;
    name: string;
    description: string;
    agencies: Agency[];
    image_url: string;
    start_date: string;
    end_date?: string;
    info_url?: string;
    wiki_url: string;
}
