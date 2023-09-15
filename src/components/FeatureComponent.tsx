import React from 'react';
import { Zap } from 'lucide-react';

// Define the TypeScript interface for the feature
interface FeatureProps {
  title: string;
  description: string;
  comingsoon: boolean; 
}

const Feature: React.FC<FeatureProps> = ({ title, description, comingsoon }) => {
  return (
    <div className="border-2 border-secondary p-4 rounded-lg shadow-md m-2 md:m-4">
      <div className="flex items-center justify-start mb-2">
        <Zap className="mr-2" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="bg-gray-300 my-2" style={{height: '2px'}} />
      <p className="text-sm md:text-base">{description}</p>
      {comingsoon && 
        <>
            <div className="bg-gray-300 my-2" style={{height: '2px'}} />
            <p className="text-sm md:text-base">Coming soon</p>
        </>
      }
    </div>
  );
};

const FeaturesComponent: React.FC = () => {
    // Features list
  const features = [
    {
      title: "AI-Powered Brainstorming",
      description: "Harness the power of AI to generate unique and creative content ideas tailored to your specific niche or industry.",
      comingsoon: false
    },
    {
      title: "Trend Analysis",
      description: "Stay ahead of the curve. Our platform analyzes current social media and internet trends to suggest relevant content ideas that resonate with today's audience.",
      comingsoon: false
    },
    {
      title: "Customizable Idea Templates",
      description: "Choose from a variety of customizable templates for different platforms and content types, ensuring you always have a format that fits your needs.",
      comingsoon: false
    },
    {
      title: "Video & Multimedia Ideas",
      description: "Beyond text, get ideas for videos, infographics, and other multimedia content that engage audiences in unique ways.",
      comingsoon: false
    },
    {
      title: "SEO Optimization Insights",
      description: "Get insights on optimizing your content for search engines, ensuring better visibility and organic reach.",
      comingsoon: false
    },
    {
      title: "Content Calendar Integration",
      description: "Plan ahead by integrating your generated content ideas directly into a content calendar, ensuring a consistent posting schedule.",
      comingsoon: true
    },
    {
      title: "Audience Feedback Loop",
      description: "Integrate audience feedback and comments to refine and pivot your content strategy, ensuring it always aligns with your audience's interests.",
      comingsoon: true
    },
    {
      title: "Multilingual Support",
      description: "Generate content ideas in multiple languages to cater to a global audience, expanding your reach and influence.",
      comingsoon: true
    },
    
    {
      title: "Content Performance Analytics",
      description: "Track the performance of your content ideas once they are published, and use data-driven insights to continuously improve.",
      comingsoon: true
    },
    {
      title: "Collaborative Workspace",
      description: "Invite team members or collaborators to brainstorm, vote, and refine ideas in real-time, fostering a collaborative content creation process.",
      comingsoon: true
    },
    {
      title: "Exclusive Industry Insights",
      description: "Get exclusive access to industry-specific insights and benchmarks, helping you understand where your content stands compared to top performers in your niche.",
      comingsoon: true
    },
    {
      title: "Personalized AI Training & Tips/Tricks",
      description: "Enhance the platform's AI capabilities by training it with your past content, enabling it to generate ideas more aligned with your brand's voice and style.",
      comingsoon: true
    }
      
];

  return (
    <div className='m-6'>
        <h2 className="m-4 text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
            <Feature key={index} {...feature} />
        ))}
        </div>
    </div>
  );
};

export default FeaturesComponent;
