export const adminRecords = [
  { id: "ADM-1024", name: "Arjun Mehta", email: "arjun.mehta@example.com", role: "Admin", city: "Bengaluru", community: "Trail Seekers", status: "Active" },
  { id: "ADM-1023", name: "Priya Nair", email: "priya.nair@example.com", role: "Admin", city: "Kochi", community: "Coastal Riders", status: "Active" },
  { id: "ADM-1022", name: "Rahul Shah", email: "rahul.shah@example.com", role: "Admin", city: "Pune", community: "Weekend Wheels", status: "Inactive" },
  { id: "ADM-1021", name: "Meera Iyer", email: "meera.iyer@example.com", role: "Admin", city: "Chennai", community: "City Cruisers", status: "Active" },
  { id: "ADM-1020", name: "Vikram Rao", email: "vikram.rao@example.com", role: "Super Admin", city: "Hyderabad", community: "All communities", status: "Active" },
  { id: "ADM-1019", name: "Ananya Das", email: "ananya.das@example.com", role: "Admin", city: "Mysuru", community: "Heritage Rides", status: "Inactive" },
];

export const eventRecords = [
  { id: "EVT-2401", title: "Western Ghats Sunrise Ride", community: "Trail Seekers", city: "Bengaluru", eventDate: "2026-12-06", capacity: 80, registrations: 64, price: 1200, status: "Published" },
  { id: "EVT-2402", title: "Coastal Highway Meetup", community: "Coastal Riders", city: "Kochi", eventDate: "2026-12-12", capacity: 60, registrations: 42, price: 850, status: "Published" },
  { id: "EVT-2403", title: "Lakeside Weekend Loop", community: "Weekend Wheels", city: "Pune", eventDate: "2026-12-18", capacity: 45, registrations: 18, price: 500, status: "Draft" },
  { id: "EVT-2404", title: "Heritage City Cruise", community: "Heritage Rides", city: "Mysuru", eventDate: "2026-12-21", capacity: 50, registrations: 50, price: 0, status: "Full" },
  { id: "EVT-2405", title: "East Coast Breakfast Run", community: "City Cruisers", city: "Chennai", eventDate: "2027-01-03", capacity: 75, registrations: 31, price: 650, status: "Published" },
  { id: "EVT-2406", title: "Deccan Night Ride", community: "Trail Seekers", city: "Hyderabad", eventDate: "2027-01-10", capacity: 55, registrations: 22, price: 900, status: "Draft" },
  { id: "EVT-2407", title: "Coffee Country Tour", community: "Weekend Wheels", city: "Bengaluru", eventDate: "2027-01-17", capacity: 40, registrations: 14, price: 450, status: "Published" },
];

export const registrationRecords = [
  { id: "REG-88041", eventName: "Western Ghats Sunrise Ride", date: "2026-12-06", amount: "₹1,200", paymentStatus: "Paid", status: "Confirmed" },
  { id: "REG-88040", eventName: "Coastal Highway Meetup", date: "2026-12-12", amount: "₹850", paymentStatus: "Pending", status: "Pending" },
  { id: "REG-88039", eventName: "Lakeside Weekend Loop", date: "2026-11-18", amount: "₹500", paymentStatus: "Paid", status: "Cancelled" },
  { id: "REG-88038", eventName: "Heritage City Cruise", date: "2026-11-02", amount: "Free", paymentStatus: "Not required", status: "Completed" },
  { id: "REG-88037", eventName: "East Coast Breakfast Run", date: "2026-10-19", amount: "₹650", paymentStatus: "Paid", status: "Completed" },
  { id: "REG-88036", eventName: "Deccan Night Ride", date: "2026-10-08", amount: "₹900", paymentStatus: "Refunded", status: "Cancelled" },
];
