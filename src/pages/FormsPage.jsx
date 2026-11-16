import { useEffect, useState } from "react";
import Card from "../components/common/Card.jsx";
import FormInput from "../components/common/FormInput.jsx";

const blankAdmin = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  city: "",
  community: "",
  status: "Active",
};

const blankEvent = {
  title: "",
  description: "",
  community: "",
  city: "",
  rideType: "",
  registrationStart: "",
  registrationEnd: "",
  eventStart: "",
  eventEnd: "",
  capacity: "",
  price: "",
};

const blankGuest = {
  fullName: "",
  mobile: "",
  vehicleModel: "",
  vehicleRegistration: "",
};

const fieldClass = "grid gap-5 sm:grid-cols-2";
const cities = ["Bengaluru", "Chennai", "Hyderabad", "Kochi", "Mysuru", "Pune"];
const communities = ["City Cruisers", "Coastal Riders", "Heritage Rides", "Trail Seekers", "Weekend Wheels"];
const formatCurrency = (amount) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(amount);

function Feedback({ children, error = false }) {
  if (!children) return null;
  return (
    <div
      role={error ? "alert" : "status"}
      className={`rounded-lg px-4 py-3 text-sm ${
        error
          ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
      }`}
    >
      {children}
    </div>
  );
}

function AdminCreationForm({ onCancel, onSaved }) {
  const [form, setForm] = useState(blankAdmin);
  const [message, setMessage] = useState("");

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setMessage("");
  }

  function resetForm() {
    setForm(blankAdmin);
    setMessage("");
  }

  function saveAdmin(event) {
    event.preventDefault();
    setMessage(`${form.fullName} has been added as ${form.role}.`);
    onSaved?.(form);
  }

  return (
    <form onSubmit={saveAdmin} className="space-y-5">
      <Card title="Admin details" description="Create an account and assign it to a community.">
        <div className={fieldClass}>
          <FormInput label="Full Name" name="fullName" value={form.fullName} onChange={updateField} placeholder="e.g. Arjun Mehta" required />
          <FormInput label="Email" name="email" type="email" value={form.email} onChange={updateField} placeholder="name@example.com" required />
          <FormInput label="Phone Number" name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="+91 98765 43210" required />
          <FormInput label="Role" name="role" type="select" value={form.role} onChange={updateField} options={["Admin", "Super Admin"]} required />
          <FormInput label="Assign City" name="city" type="select" value={form.city} onChange={updateField} options={cities} required />
          <FormInput label="Assign Community" name="community" type="select" value={form.community} onChange={updateField} options={communities} required />
          <FormInput label="Status" name="status" type="select" value={form.status} onChange={updateField} options={["Active", "Inactive"]} required />
        </div>
      </Card>
      <Feedback>{message}</Feedback>
      <div className="flex flex-wrap justify-end gap-3">
        <button type="button" onClick={onCancel} className="button-secondary">Cancel</button>
        <button type="reset" onClick={resetForm} className="button-secondary">Reset</button>
        <button type="submit" className="button-primary">Save</button>
      </div>
    </form>
  );
}

function EventCreationForm({ onCancel, onSaved }) {
  const [form, setForm] = useState(blankEvent);
  const [banner, setBanner] = useState(null);
  const [bannerUrl, setBannerUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!banner) {
      setBannerUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(banner);
    setBannerUrl(objectUrl);
    // Revoke the previous preview URL when the selected banner changes or the form unmounts.
    return () => URL.revokeObjectURL(objectUrl);
  }, [banner]);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setMessage("");
    setError("");
  }

  function updateBanner(event) {
    const file = event.target.files?.[0] || null;
    if (file && !file.type.startsWith("image/")) {
      setError("Choose a valid image file for the banner.");
      event.target.value = "";
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setError("The banner image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }
    setBanner(file);
    setError("");
    setMessage("");
  }

  function saveDraft() {
    if (!form.title.trim()) {
      setError("Add a ride title before saving a draft.");
      return;
    }
    setError("");
    onSaved?.({ ...form, status: "Draft" });
  }

  function publishRide(event) {
    event.preventDefault();
    if (form.registrationStart && form.registrationEnd && form.registrationEnd < form.registrationStart) {
      setError("Registration end date must be on or after the registration start date.");
      return;
    }
    if (form.registrationEnd && form.eventStart && form.eventStart < form.registrationEnd) {
      setError("The event must start on or after registration closes.");
      return;
    }
    if (form.eventStart && form.eventEnd && form.eventEnd < form.eventStart) {
      setError("Event end date must be on or after the event start date.");
      return;
    }
    setError("");
    onSaved?.({ ...form, status: "Published" });
  }

  return (
    <form onSubmit={publishRide} className="space-y-5">
      <Card title="Ride details" description="Start with the event name and the community it is for.">
        <div className="space-y-5">
          <div className={fieldClass}>
            <FormInput label="Ride Title" name="title" value={form.title} onChange={updateField} placeholder="e.g. Western Ghats Sunrise Ride" required />
            <FormInput label="Ride Type" name="rideType" type="select" value={form.rideType} onChange={updateField} options={["Group ride", "Scenic tour", "Track day", "Community meetup"]} required />
          </div>
          <FormInput label="Description" name="description" type="textarea" value={form.description} onChange={updateField} placeholder="Share the route, meeting point, and what riders should know." required />
        </div>
      </Card>

      <Card title="Community & location" description="Choose the community and city hosting this ride.">
        <div className={fieldClass}>
          <FormInput label="Community" name="community" type="select" value={form.community} onChange={updateField} options={communities} required />
          <FormInput label="City" name="city" type="select" value={form.city} onChange={updateField} options={cities} required />
        </div>
      </Card>

      <Card title="Schedule" description="Set registration dates and the event schedule.">
        <div className={fieldClass}>
          <FormInput label="Registration Start Date" name="registrationStart" type="date" value={form.registrationStart} onChange={updateField} required />
          <FormInput label="Registration End Date" name="registrationEnd" type="date" value={form.registrationEnd} onChange={updateField} min={form.registrationStart || undefined} required />
          <FormInput label="Event Start Date" name="eventStart" type="date" value={form.eventStart} onChange={updateField} min={form.registrationEnd || undefined} required />
          <FormInput label="Event End Date" name="eventEnd" type="date" value={form.eventEnd} onChange={updateField} min={form.eventStart || undefined} required />
        </div>
      </Card>

      <Card title="Capacity & pricing" description="Control how many riders can register and the ticket price.">
        <div className={fieldClass}>
          <FormInput label="Maximum Capacity" name="capacity" type="number" value={form.capacity} onChange={updateField} placeholder="e.g. 80" min="1" step="1" required />
          <FormInput label="Event Price" name="price" type="number" value={form.price} onChange={updateField} placeholder="0.00" min="0" step="0.01" required />
        </div>
      </Card>

      <Card title="Ride banner" description="Upload a JPG, PNG, or WebP image up to 5 MB.">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_280px]">
          <FormInput label="Banner Upload" name="banner" type="file" onChange={updateBanner} accept="image/*" />
          <div className="flex min-h-40 items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50 dark:border-gray-600 dark:bg-gray-900">
            {bannerUrl ? (
              <img src={bannerUrl} alt="Ride banner preview" className="h-full max-h-56 w-full object-cover" />
            ) : (
              <p className="px-4 text-center text-sm text-slate-500 dark:text-gray-400">Banner preview appears here</p>
            )}
          </div>
        </div>
      </Card>

      <Feedback error={Boolean(error)}>{error || message}</Feedback>
      <div className="flex flex-wrap justify-end gap-3">
        <button type="button" onClick={onCancel} className="button-secondary">Cancel</button>
        <button type="button" onClick={saveDraft} className="button-secondary">Save Draft</button>
        <button type="submit" className="button-primary">Publish Ride</button>
      </div>
    </form>
  );
}

function RideRegistrationForm({ events, onCancel, onSaved }) {
  const [eventId, setEventId] = useState("");
  const [additionalPeople, setAdditionalPeople] = useState("0");
  const [guests, setGuests] = useState([]);
  const availableEvents = events.filter(
    (event) => event.status === "Published" && event.registrations < event.capacity,
  );
  const selectedEvent = availableEvents.find((event) => event.id === eventId);
  const availableSeats = selectedEvent
    ? selectedEvent.capacity - selectedEvent.registrations
    : 1;
  const maxGuests = Math.max(0, Math.min(20, availableSeats - 1));
  const guestCount = Math.max(0, Math.min(Math.floor(Number(additionalPeople) || 0), maxGuests));

  function updateGuestCount(event) {
    const count = event.target.value;
    setAdditionalPeople(count);
    setGuests((current) => {
      const nextCount = Math.min(Number(count) || 0, maxGuests);
      return Array.from({ length: nextCount }, (_, index) => current[index] || { ...blankGuest });
    });
  }

  function updateGuest(index, event) {
    setGuests((current) => current.map((guest, guestIndex) => (
      guestIndex === index
        ? { ...guest, [event.target.name]: event.target.value }
        : guest
    )));
  }

  function updateEvent(event) {
    setEventId(event.target.value);
    setAdditionalPeople("0");
    setGuests([]);
  }

  function register(event) {
    event.preventDefault();
    const ride = availableEvents.find((item) => item.id === eventId);
    if (!ride) return;

    onSaved?.({
      eventId: ride.id,
      eventName: ride.title,
      date: ride.eventDate,
      additionalPeople: guestCount,
      guests,
      amount: Number(ride.price) * (guestCount + 1),
    });
  }

  return (
    <form onSubmit={register} className="space-y-5">
      <Card title="Ride selection" description="Choose an upcoming ride with available spaces. Your profile is already included in the registration.">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            label="Ride"
            name="rideId"
            type="select"
            value={eventId}
            onChange={updateEvent}
            options={availableEvents.map((ride) => ({
              value: ride.id,
              label: `${ride.title} · ${new Date(`${ride.eventDate}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`,
            }))}
            placeholder={availableEvents.length ? "Select a ride" : "No rides currently available"}
            required
          />
          <FormInput
            label="Additional people (excluding you)"
            name="additionalPeople"
            type="number"
            value={additionalPeople}
            onChange={updateGuestCount}
            min="0"
            max={maxGuests}
            step="1"
            required
          />
        </div>
        {selectedEvent && (
          <p className="mt-4 text-sm text-slate-500 dark:text-gray-400">
            {maxGuests} additional {maxGuests === 1 ? "space" : "spaces"} available ·{" "}
            {Number( selectedEvent.price ) === 0
              ? "Free"
              : `${formatCurrency(Number(selectedEvent.price))} per person`}
          </p>
        )}
        {!availableEvents.length && (
          <p role="status" className="mt-4 text-sm text-amber-700 dark:text-amber-300">
            There are no upcoming published rides with spaces available.
          </p>
        )}
      </Card>

      {Array.from({ length: guestCount }, (_, index) => (
        <Card
          key={index}
          title={`Additional rider ${index + 1}`}
          description="Enter details for this guest. Your own profile is not needed here."
        >
          <div className={fieldClass}>
            <FormInput
              label="Full Name"
              name="fullName"
              value={guests[index]?.fullName || ""}
              onChange={(event) => updateGuest(index, event)}
              placeholder="Guest full name"
              required
            />
            <FormInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={guests[index]?.mobile || ""}
              onChange={(event) => updateGuest(index, event)}
              placeholder="+91 98765 43210"
              required
            />
            <FormInput
              label="Vehicle Model"
              name="vehicleModel"
              value={guests[index]?.vehicleModel || ""}
              onChange={(event) => updateGuest(index, event)}
              placeholder="e.g. TVS Apache RR 310"
              required
            />
            <FormInput
              label="Vehicle Registration Number"
              name="vehicleRegistration"
              value={guests[index]?.vehicleRegistration || ""}
              onChange={(event) => updateGuest(index, event)}
              placeholder="e.g. KA 01 AB 1234"
              required
            />
          </div>
        </Card>
      ))}

      {selectedEvent && (
        <Card title="Registration summary">
          <div className="flex flex-wrap justify-between gap-2 text-sm">
            <span className="text-slate-500 dark:text-gray-400">
              {guestCount + 1} {guestCount + 1 === 1 ? "rider" : "riders"} · {selectedEvent.title}
            </span>
            <span className="font-semibold text-slate-900 dark:text-gray-100">
              {Number(selectedEvent.price) === 0
                ? "Free"
                : formatCurrency(Number(selectedEvent.price) * (guestCount + 1))}
            </span>
          </div>
        </Card>
      )}

      <div className="flex flex-wrap justify-end gap-3">
        <button type="button" onClick={onCancel} className="button-secondary">Cancel</button>
        <button type="submit" className="button-primary" disabled={!availableEvents.length}>Register for ride</button>
      </div>
    </form>
  );
}

function FormsPage({ role, events = [], onCancel, onSaved }) {
  const config = {
    "Super Admin": {
      title: "Create an administrator",
      description: "Manage administrator access and assign community responsibilities.",
      form: <AdminCreationForm onCancel={onCancel} onSaved={onSaved} />,
    },
    Admin: {
      title: "Create a ride or event",
      description: "Set up an event, manage registration, and publish it to your community.",
      form: <EventCreationForm onCancel={onCancel} onSaved={onSaved} />,
    },
    User: {
      title: "Register for a ride",
      description: "Choose an upcoming ride and add any additional riders to your registration.",
      form: <RideRegistrationForm events={events} onCancel={onCancel} onSaved={onSaved} />,
    },
  }[role];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <div className="mb-2 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-gray-800 dark:text-blue-300">
          {role}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-gray-100">{config.title}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">{config.description}</p>
      </div>
      {config.form}
    </div>
  );
}

export default FormsPage;
