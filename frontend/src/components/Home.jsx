import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <motion.div 
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-900">Automated Paperless Transparent College System</h1>
        <p className="text-lg text-gray-600 mt-4">
          Streamlining administrative processes with transparency, efficiency, and accessibility.
        </p>
        <Button className="mt-6 px-6 py-3 text-lg">Login with College Email</Button>
      </motion.div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-5xl">
        {features.map((feature, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card className="p-6 shadow-md rounded-2xl bg-white flex items-center space-x-4">
              <CheckCircle className="text-green-500" size={32} />
              <CardContent>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const features = [
  { title: "Student Election System", description: "Secure online elections with live result tracking." },
  { title: "Health & Leave Notifications", description: "Automated alerts for student health and safety." },
  { title: "Campus Facility Booking", description: "Reserve campus facilities with approval workflows." },
  { title: "Application & Approval System", description: "Submit and track applications with priority escalation." },
  { title: "Academic Integrity System", description: "Transparency in cheating records for fairness." },
  { title: "Anonymous Complaint System", description: "Submit complaints anonymously with moderation." },
  { title: "Budget & Sponsorship Tracking", description: "Public tracking of college finances and events." }
];
