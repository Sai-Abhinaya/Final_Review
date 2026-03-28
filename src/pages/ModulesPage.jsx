import React, { useState } from 'react';
import ProgressBar from '../components/common/ProgressBar.jsx';

const ModulesPage = ({ modules, onUpdateModule, onAddTime }) => {
  const [expandedModule, setExpandedModule] = useState(null);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Learning Modules</h1>

      <div className="row">
        {modules.map((module) => (
          <div key={module.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{module.name}</h5>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() =>
                      setExpandedModule(
                        expandedModule === module.id ? null : module.id
                      )
                    }
                  >
                    {expandedModule === module.id ? 'Hide' : 'View'}
                  </button>
                </div>

                <ProgressBar percentage={module.completion || 0} />

                <p className="mt-2">
                  <strong>Time:</strong> {module.timespent || 0}h
                </p>

                {expandedModule === module.id && (
                  <div className="mt-3">

                    <h6>Topics</h6>

                    {(module.activities || []).map((activity) => (
                      <div className="form-check" key={activity.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={!!activity.completed}
                          onChange={() => {
                            const updatedActivities = module.activities.map((a) =>
                              a.id === activity.id
                                ? { ...a, completed: !a.completed }
                                : a
                            );

                            onUpdateModule(module.id, updatedActivities);
                          }}
                        />
                        <label className="form-check-label">
                          {activity.name}
                        </label>
                      </div>
                    ))}

                    <button
                      className="btn btn-success btn-sm mt-3"
                      onClick={() => onAddTime(module.id, 1)}
                    >
                      + Add 1h
                    </button>

                  </div>
                )}

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesPage;
