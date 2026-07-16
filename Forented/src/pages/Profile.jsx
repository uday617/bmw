import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { User, Mail, Phone, MapPin, ChevronRight, Pencil, Check, X } from "lucide-react";
import { useAuth } from "../context/Useauth";

const API = "http://localhost:5000/api";

// Editable field component
function EditableField({ label, value, onSave, type = "text", placeholder = "—" }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || "");

  useEffect(() => setVal(value || ""), [value]);

  return (
    <div className="mb-5">
      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">{label}</p>
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            type={type}
            value={val}
            onChange={e => setVal(e.target.value)}
            className="border-b border-gray-400 text-sm text-gray-800 outline-none py-1 flex-1 focus:border-blue-500"
            placeholder={placeholder}
            autoFocus
          />
          <button onClick={() => { onSave(val); setEditing(false); }} className="text-green-600 hover:text-green-700">
            <Check size={16} />
          </button>
          <button onClick={() => { setVal(value || ""); setEditing(false); }} className="text-red-400 hover:text-red-500">
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between group">
          <p className={`text-sm ${val ? "text-gray-800" : "text-gray-400"}`}>{val || placeholder}</p>
          <button onClick={() => setEditing(true)} className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-gray-700">
            <Pencil size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

// Calculate profile completion %
function calcPercent(profile) {
  const fields = [
    profile?.name,
    profile?.birthday,
    profile?.avatar,
    profile?.phones?.mobilePrivate,
    profile?.phones?.mobileBusiness,
    profile?.phones?.landlinePrivate,
    profile?.phones?.landlineBusiness,
    profile?.addresses?.private,
    profile?.addresses?.business,
  ];
  const filled = fields.filter(f => f && f.trim() !== "").length;
  return Math.round((filled / fields.length) * 100);
}

export default function Profile() {
  const { getToken } = useAuth();
  const [activeSection, setActiveSection] = useState("Personal Data");
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const navItems = ["Personal Data", "Account Data", "Consents"];

  // Fetch profile
  useEffect(() => {
    fetch(`${API}/profile`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(r => r.json())
      .then(data => setProfile(data))
      .catch(console.error);
  }, []);

  // Save field to backend
  const saveField = async (updates) => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      setProfile(prev => ({ ...prev, ...data }));
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Upload avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await fetch(`${API}/profile/avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      const data = await res.json();
      setProfile(prev => ({ ...prev, avatar: data.avatar }));
    } catch (err) {
      console.error(err);
    }
  };

  const percent = calcPercent(profile);

  return (
    <div className="min-h-screen bg-white">
      <Navbar dark={true} />

      {/* TOP HERO */}
      <div className="pt-24 px-16 pb-10 flex items-center gap-12 border-b border-gray-200">
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-32 h-32">
            <div
              className="w-32 h-32 rounded-full bg-gray-100 border-2 border-blue-500 flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => fileRef.current.click()}
            >
              {profile?.avatar ? (
                <img src={profile.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={52} strokeWidth={1} className="text-gray-400" />
              )}
            </div>
            <button
              onClick={() => fileRef.current.click()}
              className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow"
            >
              <Pencil size={13} className="text-gray-500" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>

          {/* Progress bar */}
          <div className="flex flex-col items-center gap-1 mt-1">
            <p className="text-xs text-gray-500">
              Profile filled <span className="font-semibold">{percent}%</span>
            </p>
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-5xl font-light tracking-wide text-gray-900 mb-4">
            HELLO {profile?.name?.split(" ")[0]?.toUpperCase() ?? "..."}.
          </h1>
          <p className="text-gray-500 max-w-lg leading-relaxed text-sm">
            Welcome to your profile. We, at BMW, care about your data and want to be transparent with
            you. Please take a look at all data that is stored with your BMW ID.
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="flex px-16 py-12 gap-16 max-w-7xl">
        {/* SIDEBAR */}
        <div className="w-56 shrink-0">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">YOUR PROFILE</p>
          <div className="flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`text-left py-2 pl-3 text-sm transition border-l-2 ${
                  activeSection === item
                    ? "border-blue-600 text-gray-900 font-semibold"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          {activeSection === "Personal Data" && (
            <div>
              <h2 className="text-3xl font-light tracking-wide text-gray-900 mb-2">PERSONAL DATA</h2>
              <p className="text-sm text-gray-500 mb-8">You can edit any of your details below so your profile is up to date.</p>

              {/* PERSONAL INFO */}
              <div className="border-t border-gray-200 py-6">
                <div className="flex items-center gap-3 mb-6">
                  <User size={20} strokeWidth={1.5} className="text-gray-500" />
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900">Personal Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-8 pl-8">
                  <EditableField
                    label="Full Name"
                    value={profile?.name}
                    onSave={v => saveField({ name: v })}
                  />
                  <EditableField
                    label="Birthday"
                    value={profile?.birthday}
                    type="date"
                    onSave={v => saveField({ birthday: v })}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="border-t border-gray-200 py-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail size={20} strokeWidth={1.5} className="text-gray-500" />
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900">Contact Email</h3>
                </div>
                <div className="pl-8">
                  <p className="text-sm text-gray-500 mb-4">Your BMW ID is always your chosen email address.</p>
                  <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">Your BMW ID</p>
                  <p className="text-sm text-gray-800">{profile?.email ?? "—"}</p>
                </div>
              </div>

              {/* PHONE */}
              <div className="border-t border-gray-200 py-6">
                <div className="flex items-center gap-3 mb-4">
                  <Phone size={20} strokeWidth={1.5} className="text-gray-500" />
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900">Phone</h3>
                </div>
                <div className="pl-8 grid grid-cols-2 gap-6">
                  {[
                    { label: "Mobile Phone - Private",   key: "mobilePrivate" },
                    { label: "Mobile Phone - Business",  key: "mobileBusiness" },
                    { label: "Landline - Private",       key: "landlinePrivate" },
                    { label: "Landline - Business",      key: "landlineBusiness" },
                  ].map(({ label, key }) => (
                    <EditableField
                      key={key}
                      label={label}
                      value={profile?.phones?.[key]}
                      type="tel"
                      placeholder="+ Add phone number"
                      onSave={v => saveField({ phones: { ...profile?.phones, [key]: v } })}
                    />
                  ))}
                </div>
              </div>

              {/* ADDRESS */}
              <div className="border-t border-gray-200 py-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={20} strokeWidth={1.5} className="text-gray-500" />
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900">Address Book</h3>
                </div>
                <div className="pl-8 grid grid-cols-2 gap-6">
                  {[
                    { label: "Private Address",  key: "private" },
                    { label: "Business Address", key: "business" },
                  ].map(({ label, key }) => (
                    <EditableField
                      key={key}
                      label={label}
                      value={profile?.addresses?.[key]}
                      placeholder="+ Add address"
                      onSave={v => saveField({ addresses: { ...profile?.addresses, [key]: v } })}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "Account Data" && (
            <div>
              <h2 className="text-3xl font-light tracking-wide text-gray-900 mb-2">ACCOUNT DATA</h2>
              <p className="text-sm text-gray-500 mb-8">Manage your BMW account settings.</p>
              <div className="border-t border-gray-200 py-6">
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">Email</p>
                <p className="text-sm text-gray-800">{profile?.email ?? "—"}</p>
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2 mt-6">Account Created</p>
                <p className="text-sm text-gray-800">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—"}
                </p>
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2 mt-6">Login Method</p>
                <p className="text-sm text-gray-800">{profile?.googleId ? "Google" : "Email & Password"}</p>
              </div>
            </div>
          )}

          {activeSection === "Consents" && (
            <div>
              <h2 className="text-3xl font-light tracking-wide text-gray-900 mb-2">CONSENTS</h2>
              <p className="text-sm text-gray-500 mb-8">Review and manage your data consent preferences.</p>
              <div className="border-t border-gray-200 py-6 text-sm text-gray-400">No consents to display.</div>
            </div>
          )}

          {saving && <p className="text-xs text-blue-500 mt-4">Saving...</p>}
        </div>
      </div>
    </div>
  );
}