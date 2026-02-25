import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/models")
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Engineering Portfolio</h1>
      <div className="stats-bar">

        <div className='stat'>
          <div className='stat-number'>{projects.length}</div>
          <div className='stat-label'>Projects</div>
        </div>

        <div className='stat'>
          <div className='stat-number'>{projects.filter(p => p.status === 'COMPLETED').length}</div>
          <div className='stat-label'>Completed</div>
        </div>

        <div className='stat'>
          <div className='stat-number'>{projects.filter(p => p.status === 'IN_PROGRESS').length}</div>
          <div className='stat-label'>In Progress</div>
        </div>

        <div className='stat'>
          <div className='stat-number'>{projects.filter(p => p.status === 'PLANNED').length}</div>
          <div className='stat-label'>Planned</div>
        </div>

      </div>

      <div className="grid">
        {projects.map(project => (
          <div key={project.id} className="card">
            
            <div className="card-header">
              <h2>{project.name}</h2>
              <span className={`badge ${project.status.toLowerCase()}`}>
                {project.status}
              </span>
            </div>

            <p className="description">
              {project.description}
            </p>

            <div className="tech-list">
              {project.techStack?.split(",").map((tech, index) => (
                <span key={index} className="tech">
                  {tech.trim()}
                </span>
              ))}
            </div>

            <div className="result">
              {project.achievement}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;