import React, { useState, useEffect } from "react";
import { Trash } from "react-bootstrap-icons";
import "../styles/EventCard.css";
import axios from "axios";

export default function EventCard({ event, onDelete, currentUserId }) {
  const [rsvped, setRsvped] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(event.rsvpUsers?.length || 0);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (currentUserId && event.rsvpUsers?.includes(currentUserId)) {
      setRsvped(true);
    } else {
      setRsvped(false);
    }
  }, [event.rsvpUsers, currentUserId]);

  const handleRSVP = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!rsvped) {
        const res = await axios.post(
          `${API_BASE}/events/${event._id}/rsvp`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRsvped(true);
        setRsvpCount(res.data.rsvpCount);
      } else {
        const res = await axios.delete(`${API_BASE}/events/${event._id}/rsvp`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRsvped(false);
        setRsvpCount(res.data.rsvpCount);
      }
    } catch (err) {
      console.error("RSVP Error:", err.response?.data || err.message);
      alert("RSVP failed: " + (err.response?.data?.msg || "Server Error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-100 shadow border-0">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="card-img-top"
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
      )}

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{event.title}</h5>
          <span
            className={`badge ${
              event.isApproved ? "bg-success" : "bg-warning text-dark"
            }`}
          >
            {event.isApproved ? "Approved" : "Pending"}
          </span>
        </div>

        <p className="card-text mb-2">{event.description}</p>
        <p className="mb-1">
          <strong>📍 Location:</strong> {event.location}
        </p>
        <p className="mb-1">
          <strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-muted small mb-2">
          Created by: {event.createdBy?.name || "Unknown"}
        </p>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              onClick={handleRSVP}
              className={`btn btn-${rsvped ? "danger" : "primary"} btn-sm`}
              disabled={loading}
              aria-pressed={rsvped}
            >
              {loading ? "Processing..." : rsvped ? "Cancel RSVP" : "RSVP"}
            </button>
            <span className="small text-muted">
              🎟️ {rsvpCount} RSVP{rsvpCount !== 1 ? "s" : ""}
            </span>
          </div>

          {onDelete && event.createdBy?._id === currentUserId && (
            <div className="text-end mt-3">
              <button
                onClick={() => onDelete(event._id)}
                className="btn btn-outline-danger btn-sm"
                title="Delete this event"
              >
                <Trash className="me-1" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
