import { 
    Dog, 
    PartyPopper, 
    Home, 
    Smartphone, 
    Car, 
    Stethoscope,
    Calendar,
    DollarSign,
    Sparkles
} from "lucide-react";

export const volunteerOpportunities = [
    {
        id: 1,
        title: "Dog Care Helper",
        icon: Dog, 
        iconColor: "text-amber-600",
        iconBg: "bg-amber-100",
        description: "Help with daily care, walking, feeding, and socializing our dogs",
        commitment: "4+ hours per week. Morning (8-12), Afternoon (12-4), or Evening (4-8) shifts",
        requirements: [
            "Love for dogs",
            "Physical ability to walk dogs",
            "18+ years old",
            "Reliable and punctual"
        ],
        responsibilities: [
            "Walk dogs 2-3 times during your shift",
            "Feed and provide fresh water",
            "Play and socialize with dogs",
            "Clean kennels and maintain hygiene",
            "Monitor health and report concerns",
            "Help with basic grooming"
        ],
        benefits: [
            "Make a real difference in dogs' lives",
            "Learn dog care and behavior skills",
            "Join a community of animal lovers",
        ],
        isOneTimeEvent: false,
    },
    {
        id: 2,
        title: "Event Volunteer",
        icon: PartyPopper,
        iconColor: "text-purple-600",
        iconBg: "bg-purple-100",
        description: "Assist at adoption fairs, fundraisers, and community events",
        commitment: "Flexible, event-based. Primarily weekends and special events",
        requirements: [
            "Good communication skills",
            "Weekend availability",
            "Friendly and outgoing",
            "18+ years old"
        ],
        responsibilities: [
            "Set up and tear down event booths",
            "Greet visitors and answer questions",
            "Walk dogs and facilitate meet-and-greets",
            "Take photos and videos",
            "Manage donation tables",
            "Distribute promotional materials"
        ],
        benefits: [
            "Meet fellow animal lovers",
            "Flexible commitment",
            "Fun and social environment"
        ],
        isOneTimeEvent: false,
    },
    {
        id: 3,
        title: "Foster Care",
        icon: Home,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100",
        description: "Provide temporary home for dogs in need of special care",
        commitment: "Varies from days to months. Full-time care at your home",
        requirements: [
            "Suitable home environment",
            "Time for daily care",
            "Experience with dogs preferred",
            "21+ years old",
            "Home visit required"
        ],
        responsibilities: [
            "Provide safe and loving temporary home",
            "Feed, exercise, and socialize foster dog",
            "Administer medications if needed",
            "Transport to vet appointments",
            "Help with adoption events",
            "Provide updates and photos"
        ],
        benefits: [
            "Save lives directly",
            "Learn about different dog breeds",
            "Trial run before adopting",
            "All supplies provided",
            "Veterinary care covered"
        ],
        isOneTimeEvent: false,
    },
    {
        id: 4,
        title: "Social Media Helper",
        icon: Smartphone,
        iconColor: "text-pink-600",
        iconBg: "bg-pink-100",
        description: "Create content, manage posts, help spread awareness online",
        commitment: "Remote, flexible hours. Work on your own schedule",
        requirements: [
            "Social media experience",
            "Creative mindset",
            "Basic photo/video editing skills",
            "Reliable internet connection"
        ],
        responsibilities: [
            "Create engaging social media posts",
            "Edit photos and videos of dogs",
            "Write compelling adoption stories",
            "Respond to comments and messages",
            "Track engagement metrics",
            "Plan content calendar"
        ],
        benefits: [
            "Work from anywhere",
            "Build your portfolio",
            "Help dogs find homes through storytelling",
            "Flexible schedule"
        ],
        isOneTimeEvent: false,
    },
    {
        id: 5,
        title: "Transport Assistant",
        icon: Car,
        iconColor: "text-green-600",
        iconBg: "bg-green-100",
        description: "Drive dogs to vet appointments, events, or new homes",
        commitment: "On-call basis, as needed. Flexible scheduling",
        requirements: [
            "Valid driver's license",
            "Reliable vehicle",
            "Flexible schedule",
            "Good driving record",
            "21+ years old"
        ],
        responsibilities: [
            "Transport dogs to vet appointments",
            "Drive to adoption events",
            "Pick up supplies and donations",
            "Help with dog relocations",
            "Ensure safe and comfortable transport",
            "Maintain vehicle cleanliness"
        ],
        benefits: [
            "Flexible commitment",
            "Critical role in operations",
            "Short time commitment"
        ],
        isOneTimeEvent: false,
    },
    {
        id: 6,
        title: "Medical Support",
        icon: Stethoscope,
        iconColor: "text-red-600",
        iconBg: "bg-red-100",
        description: "Assist with basic medical care, medications, and health monitoring",
        commitment: "Scheduled shifts: Morning, Afternoon, or Evening",
        requirements: [
            "Veterinary background or training",
            "Medical knowledge",
            "Attention to detail",
            "Calm under pressure",
            "Background check required"
        ],
        responsibilities: [
            "Assist with basic medical procedures",
            "Administer medications",
            "Monitor health conditions",
            "Maintain medical records",
            "Support during vet visits",
            "Educate volunteers on health issues"
        ],
        benefits: [
            "Use your medical skills",
            "Gain veterinary experience",
            "Work with vet professionals",
            "Make critical impact",
        ],
        isOneTimeEvent: false,
    }
];

export const upcomingEvents = [
    {
        id: 1,
        title: "Spring Adoption Fair",
        icon: PartyPopper,
        date: "2026-03-15",
        time: "10:00 AM - 4:00 PM",
        location: "Central Park, Bucharest",
        description: "Help us find homes for 20+ dogs! We need volunteers for setup, dog walking, greeting visitors, and photography.",
        volunteersNeeded: 15,
        volunteersSignedUp: 8,
        type: "adoption-fair",
        responsibilities: [
            "Set up event booths and displays in the morning",
            "Greet visitors and provide information about adoptable dogs",
            "Walk dogs and facilitate meet-and-greets with potential adopters",
            "Take photos and videos throughout the event",
            "Help with paperwork and adoption applications",
            "Tear down and clean up at the end of the day"
        ],
        requirements: [
            "Good communication and people skills",
            "Comfortable handling dogs of various sizes",
            "Available for the full event duration (10 AM - 4 PM)",
            "Physically able to stand and walk for extended periods",
            "18+ years old"
        ],
        benefits: [
            "See dogs find their forever homes",
            "Meet fellow animal lovers in the community",
            "One-time commitment with no ongoing obligations",
            "Free lunch and refreshments provided",
            "Receive a volunteer appreciation certificate"
        ],
        commitment: "One day event on March 15th, 2026. Full day commitment from 10:00 AM - 4:00 PM",
        isOneTimeEvent: true,

    },
    {
        id: 2,
        title: "Fundraising Bake Sale",
        icon: DollarSign,
        date: "2026-03-23",
        time: "2:00 PM - 6:00 PM",
        location: "Shopping Mall, Sector 1",
        description: "Raise funds for medical care! We need volunteers for baking, managing the stand, and handling donations.",
        volunteersNeeded: 8,
        volunteersSignedUp: 3,
        type: "fundraiser",
        responsibilities: [
            "Bake treats at home before the event (optional)",
            "Set up the bake sale stand and displays",
            "Greet customers and sell baked goods",
            "Handle cash and card payments accurately",
            "Share information about our shelter and mission",
            "Pack up remaining items at the end"
        ],
        requirements: [
            "Friendly and outgoing personality",
            "Basic math skills for handling money",
            "Available for afternoon shift (2 PM - 6 PM)",
            "Baking skills helpful but not required",
            "16+ years old (under 18 with parent supervision)"
        ],
        benefits: [
            "Directly support dogs in need of medical care",
            "Flexible time commitment (half-day event)",
            "Fun, social atmosphere at the mall",
            "Take home leftover baked goods",
            "Learn fundraising skills"
        ],
        commitment: "Half-day event on March 23rd, 2026. Afternoon shift from 2:00 PM - 6:00 PM",
        isOneTimeEvent: true,
    },
    {
        id: 3,
        title: "Shelter Spring Cleaning",
        icon: Sparkles,
        date: "2026-04-05",
        time: "9:00 AM - 1:00 PM",
        location: "PawSome Shelter, Bucharest",
        description: "Help us prepare for spring! We need volunteers for deep cleaning, painting, organizing supplies, and yard work.",
        volunteersNeeded: 20,
        volunteersSignedUp: 5,
        type: "shelter-work",
        responsibilities: [
            "Deep clean kennels, play areas, and common spaces",
            "Paint walls and touch up worn areas",
            "Organize supply closets and storage areas",
            "Yard work including weeding and planting flowers",
            "Wash dog toys, blankets, and bowls",
            "Minor repairs and maintenance tasks"
        ],
        requirements: [
            "Physically able to do cleaning and light manual labor",
            "Comfortable working with cleaning supplies",
            "Willing to get dirty and work hard",
            "Available for morning shift (9 AM - 1 PM)",
            "18+ years old",
            "Bring work gloves and wear old clothes"
        ],
        benefits: [
            "Make a huge impact on shelter environment",
            "See the immediate results of your work",
            "Team bonding experience with other volunteers",
            "Pizza lunch provided for all volunteers",
            "Behind-the-scenes shelter tour",
            "Meet all the dogs and staff"
        ],
        commitment: "Half-day event on April 5th, 2026. Morning shift from 9:00 AM - 1:00 PM with lunch provided",
        isOneTimeEvent: true,

    }
];