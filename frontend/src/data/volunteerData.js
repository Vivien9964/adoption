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
        type: "ongoing"
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
        type: "events"
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
        type: "foster"
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
        type: "remote"
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
        type: "occasional"
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
        type: "specialized"
    }
];

export const upcomingEvents = [
    {
        id: 1,
        title: "Spring Adoption Fair",
        icon: PartyPopper,
        iconColor: "text-blue-600",
        iconBg: "bg-blue-100",
        date: "2026-03-15",
        time: "10:00 AM - 4:00 PM",
        location: "Central Park, Bucharest",
        description: "Help us find homes for 20+ dogs! We need volunteers for setup, dog walking, greeting visitors, and photography.",
        volunteersNeeded: 15,
        volunteersSignedUp: 8,
        type: "adoption-fair"
    },
    {
        id: 2,
        title: "Fundraising Bake Sale",
        icon: DollarSign,
        iconColor: "text-green-600",
        iconBg: "bg-green-100",
        date: "2026-03-23",
        time: "2:00 PM - 6:00 PM",
        location: "Shopping Mall, Sector 1",
        description: "Raise funds for medical care! We need volunteers for baking, managing the stand, and handling donations.",
        volunteersNeeded: 8,
        volunteersSignedUp: 3,
        type: "fundraiser"
    },
    {
        id: 3,
        title: "Shelter Spring Cleaning",
        icon: Sparkles,
        iconColor: "text-purple-600",
        iconBg: "bg-purple-100",
        date: "2026-04-05",
        time: "9:00 AM - 1:00 PM",
        location: "PawSome Shelter, Bucharest",
        description: "Help us prepare for spring! We need volunteers for deep cleaning, painting, organizing supplies, and yard work.",
        volunteersNeeded: 20,
        volunteersSignedUp: 5,
        type: "shelter-work"
    }
];