import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BsPlus, BsTrash, BsCalendar, BsGeoAlt, BsClock } from 'react-icons/bs';
import './ItineraryBuilder.css';

const ItineraryBuilder = () => {
  const { user } = useSelector((state) => state.auth);
  const [itinerary, setItinerary] = useState({
    title: '',
    startDate: '',
    endDate: '',
    destinations: []
  });

  const [newDestination, setNewDestination] = useState({
    name: '',
    arrivalDate: '',
    departureDate: '',
    activities: [''],
    notes: ''
  });

  const addDestination = () => {
    if (!newDestination.name || !newDestination.arrivalDate) {
      toast.error('Please fill in destination name and arrival date');
      return;
    }

    setItinerary({
      ...itinerary,
      destinations: [...itinerary.destinations, { ...newDestination, id: Date.now() }]
    });

    setNewDestination({
      name: '',
      arrivalDate: '',
      departureDate: '',
      activities: [''],
      notes: ''
    });

    toast.success('Destination added to itinerary!');
  };

  const removeDestination = (id) => {
    setItinerary({
      ...itinerary,
      destinations: itinerary.destinations.filter(dest => dest.id !== id)
    });
    toast.info('Destination removed');
  };

  const addActivity = () => {
    setNewDestination({
      ...newDestination,
      activities: [...newDestination.activities, '']
    });
  };

  const updateActivity = (index, value) => {
    const updatedActivities = [...newDestination.activities];
    updatedActivities[index] = value;
    setNewDestination({ ...newDestination, activities: updatedActivities });
  };

  const removeActivity = (index) => {
    const updatedActivities = newDestination.activities.filter((_, i) => i !== index);
    setNewDestination({ ...newDestination, activities: updatedActivities });
  };

  const saveItinerary = () => {
    if (!itinerary.title || itinerary.destinations.length === 0) {
      toast.error('Please add a title and at least one destination');
      return;
    }

    const savedItineraries = JSON.parse(localStorage.getItem('itineraries') || '[]');
    const newItinerary = { ...itinerary, id: Date.now(), createdAt: new Date().toISOString() };
    localStorage.setItem('itineraries', JSON.stringify([...savedItineraries, newItinerary]));
    
    toast.success('Itinerary saved successfully!');
    setItinerary({ title: '', startDate: '', endDate: '', destinations: [] });
  };

  return (
    <div className="itinerary-builder section">
      <div className="container">
        <div className="itinerary-header">
          <h1>Itinerary Builder</h1>
          <p>Plan your perfect trip with multiple destinations</p>
        </div>

        <div className="itinerary-form">
          <div className="form-section">
            <h2>Trip Details</h2>
            <div className="form-group">
              <label>Trip Title</label>
              <input
                type="text"
                placeholder="e.g., European Summer Adventure"
                value={itinerary.title}
                onChange={(e) => setItinerary({ ...itinerary, title: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label><BsCalendar className="icon" /> Start Date</label>
                <input
                  type="date"
                  value={itinerary.startDate}
                  onChange={(e) => setItinerary({ ...itinerary, startDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label><BsCalendar className="icon" /> End Date</label>
                <input
                  type="date"
                  value={itinerary.endDate}
                  onChange={(e) => setItinerary({ ...itinerary, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Add Destination</h2>
            <div className="form-group">
              <label><BsGeoAlt className="icon" /> Destination Name</label>
              <input
                type="text"
                placeholder="e.g., Paris, France"
                value={newDestination.name}
                onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Arrival Date</label>
                <input
                  type="date"
                  value={newDestination.arrivalDate}
                  onChange={(e) => setNewDestination({ ...newDestination, arrivalDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Departure Date</label>
                <input
                  type="date"
                  value={newDestination.departureDate}
                  onChange={(e) => setNewDestination({ ...newDestination, departureDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Activities</label>
              {newDestination.activities.map((activity, index) => (
                <div key={index} className="activity-input">
                  <input
                    type="text"
                    placeholder={`Activity ${index + 1}`}
                    value={activity}
                    onChange={(e) => updateActivity(index, e.target.value)}
                  />
                  {newDestination.activities.length > 1 && (
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => removeActivity(index)}
                    >
                      <BsTrash />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn-add-activity" onClick={addActivity}>
                <BsPlus /> Add Activity
              </button>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                placeholder="Add any notes or special considerations..."
                value={newDestination.notes}
                onChange={(e) => setNewDestination({ ...newDestination, notes: e.target.value })}
                rows="3"
              />
            </div>

            <button className="btn btn-primary" onClick={addDestination}>
              <BsPlus /> Add Destination to Itinerary
            </button>
          </div>

          {itinerary.destinations.length > 0 && (
            <div className="form-section">
              <h2>Your Itinerary ({itinerary.destinations.length} destinations)</h2>
              <div className="destinations-list">
                {itinerary.destinations.map((dest, index) => (
                  <div key={dest.id} className="destination-card">
                    <div className="destination-header">
                      <h3>
                        <span className="dest-number">{index + 1}</span>
                        {dest.name}
                      </h3>
                      <button
                        className="btn-remove"
                        onClick={() => removeDestination(dest.id)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                    <div className="destination-details">
                      <p>
                        <BsClock className="icon" />
                        {new Date(dest.arrivalDate).toLocaleDateString()} - 
                        {dest.departureDate ? new Date(dest.departureDate).toLocaleDateString() : 'TBD'}
                      </p>
                      {dest.activities.filter(a => a).length > 0 && (
                        <div className="activities">
                          <strong>Activities:</strong>
                          <ul>
                            {dest.activities.filter(a => a).map((activity, i) => (
                              <li key={i}>{activity}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {dest.notes && (
                        <p className="notes"><strong>Notes:</strong> {dest.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-success btn-save" onClick={saveItinerary}>
                Save Itinerary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
