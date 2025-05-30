export interface Service {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Inactive" | "Pending";
  price: string;
  features: string[];
  lastUpdated: string;
}

export interface ServiceSubscription {
  id: string;
  serviceId: number;
  userId: string;
  startDate: string;
  endDate?: string;
  status: "Active" | "Cancelled" | "Expired";
}

export interface ServiceDetailProps {
  serviceId: string;
}

export interface ServiceListProps {
  onServiceSelect?: (serviceId: number) => void;
}
