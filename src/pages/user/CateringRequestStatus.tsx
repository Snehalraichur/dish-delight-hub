import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, MessageSquare, Calendar, Users, MapPin, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { UserLayout } from "@/components/layouts/UserLayout";

const CateringRequestStatus = () => {
  const navigate = useNavigate();

  const request = {
    id: "CAT-2024-001",
    status: "pending",
    caterer: {
      name: "Bella Italia Catering",
      avatar: "/placeholder.svg"
    },
    eventType: "Birthday Party",
    date: "January 15, 2025",
    time: "6:00 PM",
    guestCount: 30,
    location: "123 Party Lane, Downtown",
    budget: "$1,000 - $2,500",
    dietary: ["Vegetarian", "Gluten-Free"],
    submittedAt: "December 28, 2024",
    timeline: [
      { step: "Request Submitted", status: "completed", date: "Dec 28, 10:30 AM" },
      { step: "Under Review", status: "current", date: "In Progress" },
      { step: "Quote Received", status: "pending", date: "" },
      { step: "Confirmed", status: "pending", date: "" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "reviewing": return "bg-blue-100 text-blue-700";
      case "quoted": return "bg-purple-100 text-purple-700";
      case "confirmed": return "bg-green-100 text-green-700";
      case "declined": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getProgress = () => {
    const completedSteps = request.timeline.filter(t => t.status === "completed").length;
    const currentStep = request.timeline.findIndex(t => t.status === "current");
    return ((completedSteps + 0.5) / request.timeline.length) * 100;
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Request Status</h1>
            <p className="text-sm text-muted-foreground">ID: {request.id}</p>
          </div>
          <Badge className={getStatusColor(request.status)}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </Badge>
        </div>

        {/* Caterer Info */}
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <ChefHat className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{request.caterer.name}</p>
              <p className="text-sm text-muted-foreground">Submitted: {request.submittedAt}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/messages")}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </CardContent>
        </Card>

        {/* Progress Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Request Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={getProgress()} className="h-2" />
            <div className="space-y-4">
              {request.timeline.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === "completed" ? "bg-green-500 text-white" :
                    step.status === "current" ? "bg-primary text-white animate-pulse" :
                    "bg-muted"
                  }`}>
                    {step.status === "completed" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : step.status === "current" ? (
                      <Clock className="h-5 w-5" />
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.status === "pending" ? "text-muted-foreground" : ""}`}>
                      {step.step}
                    </p>
                    {step.date && (
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{request.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{request.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Guests</p>
                  <p className="font-medium">{request.guestCount} people</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Downtown</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-2">Event Type</p>
              <Badge variant="secondary">{request.eventType}</Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Budget Range</p>
              <p className="font-medium">{request.budget}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Dietary Requirements</p>
              <div className="flex flex-wrap gap-2">
                {request.dietary.map((d) => (
                  <Badge key={d} variant="outline">{d}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => navigate(`/catering-request?edit=${request.id}`)}>
            Edit Request
          </Button>
          <Button variant="destructive" className="flex-1">
            Cancel Request
          </Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default CateringRequestStatus;
