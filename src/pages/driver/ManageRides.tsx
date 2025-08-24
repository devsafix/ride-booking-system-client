import ActiveRideManagement from "@/components/modules/driver/ActiveRideManagement";
import AvailabilityToggle from "@/components/modules/driver/AvailabilityToggle";
import IncomingRequests from "@/components/modules/driver/IncomingRequest";

const ManageRides = () => {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Rides</h1>
          <p className="text-muted-foreground mt-2">
            Manage your availability, view incoming requests, and track active
            rides
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Status and Requests */}
          <div className="lg:col-span-1 space-y-6">
            <AvailabilityToggle />
            <IncomingRequests />
          </div>

          {/* Right Column - Active Ride */}
          <div className="lg:col-span-2">
            <ActiveRideManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRides;
