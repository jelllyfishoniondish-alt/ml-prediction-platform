import React, { startTransition, useDeferredValue, useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardList,
  Filter,
  PencilLine,
  PlusCircle,
  Search,
  Sparkles,
  Trash2,
  XCircle,
} from "lucide-react";
import "./App.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
});

const STATUS_OPTIONS = ["PLANNED", "IN_PROGRESS", "COMPLETED"];

function createEmptyProject() {
  return {
    name: "",
    category: "",
    techStack: "",
    status: "PLANNED",
    description: "",
    achievement: "",
  };
}

function formatStatus(status) {
  return status
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk[0].toUpperCase() + chunk.slice(1))
    .join(" ");
}

function readErrorMessage(error, fallbackMessage) {
  return error?.response?.data?.message || fallbackMessage;
}

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [draft, setDraft] = useState(createEmptyProject);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/api/models");
      startTransition(() => {
        setProjects(response.data);
      });
    } catch (requestError) {
      setError(
        readErrorMessage(
          requestError,
          "Unable to load projects right now. Please verify the backend service is running."
        )
      );
    } finally {
      setLoading(false);
    }
  }

  const visibleProjects = projects.filter((project) => {
    const matchesStatus = statusFilter === "ALL" || project.status === statusFilter;
    const normalizedQuery = deferredSearchTerm.trim().toLowerCase();

    if (!matchesStatus) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      project.name,
      project.category,
      project.techStack,
      project.description,
      project.achievement,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  const stats = [
    { label: "Visible Projects", value: visibleProjects.length },
    {
      label: "Completed",
      value: visibleProjects.filter((project) => project.status === "COMPLETED").length,
    },
    {
      label: "In Progress",
      value: visibleProjects.filter((project) => project.status === "IN_PROGRESS").length,
    },
    {
      label: "Planned",
      value: visibleProjects.filter((project) => project.status === "PLANNED").length,
    },
  ];

  function handleDraftChange(event) {
    const { name, value } = event.target;
    setDraft((currentDraft) => ({
      ...currentDraft,
      [name]: value,
    }));
  }

  function resetDraft() {
    setDraft(createEmptyProject());
    setEditingId(null);
  }

  function beginEditing(project) {
    setEditingId(project.id);
    setDraft({
      name: project.name || "",
      category: project.category || "",
      techStack: project.techStack || "",
      status: project.status || "PLANNED",
      description: project.description || "",
      achievement: project.achievement || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = {
      ...draft,
      name: draft.name.trim(),
      category: draft.category.trim(),
      techStack: draft.techStack.trim(),
      description: draft.description.trim(),
      achievement: draft.achievement.trim(),
    };

    try {
      if (editingId) {
        const response = await api.put(`/api/models/${editingId}`, payload);
        startTransition(() => {
          setProjects((currentProjects) =>
            currentProjects.map((project) =>
              project.id === editingId ? response.data : project
            )
          );
        });
      } else {
        const response = await api.post("/api/models", payload);
        startTransition(() => {
          setProjects((currentProjects) => [response.data, ...currentProjects]);
        });
      }

      resetDraft();
    } catch (requestError) {
      setError(
        readErrorMessage(
          requestError,
          "Unable to save the project right now. Please try again once the backend is available."
        )
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(projectId) {
    if (!window.confirm("Delete this project from the portfolio?")) {
      return;
    }

    setDeletingId(projectId);
    setError("");

    try {
      await api.delete(`/api/models/${projectId}`);
      startTransition(() => {
        setProjects((currentProjects) =>
          currentProjects.filter((project) => project.id !== projectId)
        );
      });

      if (editingId === projectId) {
        resetDraft();
      }
    } catch (requestError) {
      setError(
        readErrorMessage(
          requestError,
          "Unable to delete the project right now. Please try again once the backend is available."
        )
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="page-shell">
      <motion.section
        className="hero-panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="hero-copy">
          <span className="eyebrow">Engineering Portfolio</span>
          <h1 className="title">Project Control Center</h1>
          <p className="subtitle">
            Search, filter, and manage projects from a single dashboard while keeping
            your full-stack portfolio synchronized with the backend.
          </p>
        </div>

        <div className="hero-highlight">
          <Sparkles size={22} />
          <div>
            <strong>Two major milestones are now marked as completed.</strong>
            <span>
              Full-Stack Project Management Platform and Digital Twin Network
              Modeling will sync as completed records on backend startup.
            </span>
          </div>
        </div>
      </motion.section>

      <section className="workspace">
        <motion.aside
          className="editor-panel"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08, duration: 0.42 }}
        >
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">CRUD Workspace</span>
              <h2>{editingId ? "Update Project" : "Add Project"}</h2>
            </div>
            {editingId ? (
              <button type="button" className="ghost-button" onClick={resetDraft}>
                <XCircle size={16} />
                Cancel Edit
              </button>
            ) : null}
          </div>

          <form className="project-form" onSubmit={handleSubmit}>
            <label>
              Project Name
              <input
                name="name"
                value={draft.name}
                onChange={handleDraftChange}
                placeholder="Ex: Distributed Task Orchestrator"
                required
              />
            </label>

            <label>
              Category
              <input
                name="category"
                value={draft.category}
                onChange={handleDraftChange}
                placeholder="System Design Project"
              />
            </label>

            <label>
              Tech Stack
              <input
                name="techStack"
                value={draft.techStack}
                onChange={handleDraftChange}
                placeholder="Java, gRPC, Redis, Docker"
              />
            </label>

            <label>
              Status
              <select name="status" value={draft.status} onChange={handleDraftChange}>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={draft.description}
                onChange={handleDraftChange}
                placeholder="Summarize the project scope, context, and main implementation."
                rows="4"
              />
            </label>

            <label>
              Highlight
              <input
                name="achievement"
                value={draft.achievement}
                onChange={handleDraftChange}
                placeholder="Deployment Phase"
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="primary-button" disabled={submitting}>
                <PlusCircle size={16} />
                {submitting
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Create Project"}
              </button>

              <button type="button" className="ghost-button" onClick={resetDraft}>
                Reset
              </button>
            </div>
          </form>
        </motion.aside>

        <div className="dashboard-panel">
          <motion.div
            className="toolbar"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            <div className="search-box">
              <Search size={18} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, stack, category, or achievement"
              />
            </div>

            <label className="select-box">
              <Filter size={18} />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="ALL">All Statuses</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </label>
          </motion.div>

          <motion.div
            className="summary-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.42 }}
          >
            <div className="summary-note">
              <ClipboardList size={18} />
              <span>
                Showing <strong>{visibleProjects.length}</strong> of{" "}
                <strong>{projects.length}</strong> projects
              </span>
            </div>

            <button type="button" className="ghost-button" onClick={loadProjects}>
              Refresh Data
            </button>
          </motion.div>

          <motion.div
            className="stats-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index + 0.2, duration: 0.36 }}
              >
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.article>
            ))}
          </motion.div>

          {error ? <div className="feedback-banner error-banner">{error}</div> : null}
          {loading ? <div className="feedback-banner">Loading portfolio data...</div> : null}
          {!loading && !visibleProjects.length ? (
            <div className="feedback-banner">
              No projects match the current search and filter combination.
            </div>
          ) : null}

          <motion.div className="project-grid" layout>
            <AnimatePresence>
              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  className="project-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                >
                  <div className="card-topline">
                    <span className="card-category">{project.category}</span>
                    <span className={`badge ${project.status.toLowerCase()}`}>
                      {formatStatus(project.status)}
                    </span>
                  </div>

                  <h3>{project.name}</h3>
                  <p className="description">{project.description}</p>

                  <div className="tech-list">
                    {(project.techStack || "")
                      .split(",")
                      .map((tech) => tech.trim())
                      .filter(Boolean)
                      .map((tech) => (
                        <span key={`${project.id}-${tech}`} className="tech">
                          {tech}
                        </span>
                      ))}
                  </div>

                  <div className="result">{project.achievement}</div>

                  <div className="card-actions">
                    <button
                      type="button"
                      className="ghost-button"
                      onClick={() => beginEditing(project)}
                    >
                      <PencilLine size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                    >
                      <Trash2 size={16} />
                      {deletingId === project.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default App;
