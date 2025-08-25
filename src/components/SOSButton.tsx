import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Share2, AlertTriangle, X } from "lucide-react";
import toast from "react-hot-toast";

interface SOSButtonProps {
  rideStatus: string;
  emergencyContacts: { name: string; phone?: string; email?: string }[];
}

export default function SOSButton({
  rideStatus,
  emergencyContacts,
}: SOSButtonProps) {
  const [open, setOpen] = useState(false);

  if (!["accepted", "picked_up", "in_transit"].includes(rideStatus))
    return null;

  const handleCallPolice = () => {
    window.location.href = "tel:+8801709190412";
  };

  const handleNotifyContact = () => {
    if (emergencyContacts.length === 0) {
      toast.error("No emergency contacts saved!");
      return;
    }
    const contact = emergencyContacts[0];
    window.location.href = `sms:${contact.phone}?body=I need help! Check my location.`;
    toast.success(`Emergency contact ${contact.name} notified.`);
  };

  const handleShareLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        navigator.clipboard.writeText(mapsUrl);
        toast.success("Location link copied & ready to share!");
      },
      () => toast.error("Unable to fetch location.")
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="backdrop-blur-sm bg-background/95 border border-border rounded-2xl shadow-2xl p-6 space-y-4 min-w-[240px] animate-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <h3 className="font-semibold text-foreground text-sm tracking-wide">
              EMERGENCY OPTIONS
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="h-8 w-8 p-0 rounded-full hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleCallPolice}
              className="w-full justify-start gap-3 h-12 bg-foreground text-background hover:bg-foreground/90 font-medium transition-all duration-200 hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4" />
              Call Police
            </Button>

            <Button
              onClick={handleNotifyContact}
              variant="outline"
              className="w-full justify-start gap-3 h-12 border-border hover:bg-muted/50 font-medium transition-all duration-200 hover:scale-[1.02]"
            >
              <AlertTriangle className="w-4 h-4" />
              Notify Contact
            </Button>

            <Button
              onClick={handleShareLocation}
              variant="outline"
              className="w-full justify-start gap-3 h-12 border-border hover:bg-muted/50 font-medium transition-all duration-200 hover:scale-[1.02]"
            >
              <Share2 className="w-4 h-4" />
              Share Location
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
            Emergency services will be contacted
          </p>
        </div>
      ) : (
        <Button
          size="sm"
          className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-10 w-10 flex items-center justify-center shadow-2xl font-bold text-xs tracking-wider transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-background/20"
          onClick={() => setOpen(true)}
        >
          SOS
        </Button>
      )}
    </div>
  );
}
