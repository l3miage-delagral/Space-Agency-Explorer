
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

export interface Launch {
    id: number;
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
}

export interface Status {
    id: number;
    name: string;
}

export interface Rocket {
    id: number;
    configuration: RocketConfiguration;
    spacecraft_stage?: SpacecraftStage;
}

export interface RocketConfiguration {
    id: number;
    name: string;
    family: string;
    full_name: string;
    variant: string;
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
    id: number;
    url: string;
    name: string;
    type: string;
}

export interface Mission {
    id: number;
    name: string;
    description: string;
    launch_designator: string;
    type: string;
    orbit: Orbit;
}

export interface Orbit {
    id: number;
    name: string;
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
    title: string;
    description: string;
    feature_image: string;
    url: string;
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
