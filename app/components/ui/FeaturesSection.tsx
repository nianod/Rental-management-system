// app/components/landing/FeaturesSection.tsx
import { Shield, MessageSquare, CreditCard, Wrench, Bell, FileText } from 'lucide-react';
import { features } from '@/app/lib/data';

const iconMap: Record<string, React.ReactNode> = {
  '💳': <CreditCard className="w-6 h-6" />,
  '🔧': <Wrench className="w-6 h-6" />,
  '📱': <Bell className="w-6 h-6" />,
  '💬': <MessageSquare className="w-6 h-6" />,
  '📄': <FileText className="w-6 h-6" />,
  '🔒': <Shield className="w-6 h-6" />,
};


const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#060219] to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="text-transparent bg-clip-text bg-blue-700">
              Titan Rental?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our digital platform enhances your living experience with modern solutions 
            designed for convenience and security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
               {iconMap[feature.icon] && (
                  <span className="text-2xl">{feature.icon}</span>
               )}
                
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center text-sm text-blue-400">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    Integrated with platform
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 bg-gradient-to-r from-[#07072e] to-[black] border border-blue-700/30 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">Tenant Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1-2</div>
              <div className="text-gray-400">Days Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400">Secure Payments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;