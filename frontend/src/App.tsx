import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Ticket } from './types/Ticket';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch tickets when the app loads
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tickets');
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTicket = { title, description };
      await axios.post('http://localhost:8080/api/tickets', newTicket);
      setTitle('');
      setDescription('');
      fetchTickets(); // Refresh the list
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Smart Desk Support</h1>

        {/* Ticket Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Submit a New Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Ticket
            </button>
          </form>
        </div>

        {/* Ticket List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Active Tickets</h2>
          <div className="space-y-4">
            {tickets.length === 0 ? (
              <p className="text-gray-500">No tickets found.</p>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} className="border p-4 rounded bg-gray-50 flex flex-col space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{ticket.title}</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-gray-600">{ticket.description}</p>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <span className="font-medium">Status: {ticket.status}</span>
                    <span>|</span>
                    <span className="font-medium">Category: {ticket.category}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;