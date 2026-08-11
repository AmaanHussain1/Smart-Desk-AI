import { useState, useEffect } from "react";
import axios from "axios";
import type { Ticket } from "./types/Ticket";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tickets when the app loads
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newTicket = { title, description };
      await axios.post("http://localhost:8080/api/tickets", newTicket);
      setTitle("");
      setDescription("");
      fetchTickets(); // Refresh the list
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority?.toUpperCase()) {
      case "HIGH":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "MEDIUM":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "LOW":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "RESOLVED":
        return "bg-emerald-50 text-emerald-600 ring-emerald-600/20";
      case "IN_PROGRESS":
        return "bg-sky-50 text-sky-600 ring-sky-600/20";
      default:
        return "bg-slate-100 text-slate-600 ring-slate-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              SD
            </div>
            <div>
              <h1 className="font-bold text-lg text-white leading-none">
                Smart Desk AI
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">Support Workspace</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-300">
              System Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Create Ticket Form */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
            <h2 className="text-xl font-bold text-white mb-1">
              Submit a Support Request
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Fill out the details below. Our system will log your issue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Issue Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., VPN connection failed"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Detailed Description
                </label>
                <textarea
                  placeholder="Provide context or error messages..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/20 transition duration-150 disabled:opacity-50 flex justify-center items-center"
              >
                {loading ? "Submitting..." : "Submit Ticket"}
              </button>
            </form>
          </div>
        </section>

        {/* Right Column: Ticket Feed */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Active Queue</h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 font-medium">
              {tickets.length} {tickets.length === 1 ? "Ticket" : "Tickets"}
            </span>
          </div>

          <div className="space-y-4">
            {tickets.length === 0 ? (
              <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl p-8 text-center text-slate-400">
                No active tickets found. Submit one to get started!
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 shadow-md hover:border-slate-600 transition group"
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="font-semibold text-lg text-slate-100 group-hover:text-indigo-400 transition">
                      {ticket.title}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getPriorityBadge(
                        ticket.priority,
                      )}`}
                    >
                      {ticket.priority || "PENDING_AI"}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-3">
                    {ticket.description}
                  </p>

                  <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadge(
                          ticket.status,
                        )}`}
                      >
                        {ticket.status || "OPEN"}
                      </span>
                      <span>
                        Category:{" "}
                        <strong className="text-slate-200">
                          {ticket.category || "UNASSIGNED"}
                        </strong>
                      </span>
                    </div>
                    {ticket.id && (
                      <span className="font-mono text-slate-500">
                        #{ticket.id}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
