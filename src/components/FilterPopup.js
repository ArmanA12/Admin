import React, { useState, useEffect } from 'react';

const FilterPopup = ({ filterType, filterValues, onClose, onFilterChange, setFilterType }) => {
    const [localFilterValues, setLocalFilterValues] = useState({ roles: [], teams: [] });

    useEffect(() => {
        // Sync localFilterValues with filterValues when filterType changes
        setLocalFilterValues({
            ...localFilterValues,
            [filterType]: filterValues[filterType] || [],
        });
    }, [filterType, filterValues]);

    const handleCheckboxChange = (type, value) => {
        setLocalFilterValues(prev => {
            const newValues = { ...prev };
            if (newValues[type].includes(value)) {
                newValues[type] = newValues[type].filter(item => item !== value);
            } else {
                newValues[type].push(value);
            }
            return newValues;
        });
    };

    const handleApply = () => {
        onFilterChange(filterType, localFilterValues[filterType]);
        onClose();
    };

    const roles = ['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer'];
    const teams = ['Design', 'Marketing', 'Technology'];

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md shadow-lg w-80">
                <h3 className="text-lg font-bold mb-4">Filter by {filterType === 'role' ? 'Role' : 'Team'}</h3>
                <div>
                    {(filterType === 'role' ? roles : teams).map(item => (
                        <div key={item} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={localFilterValues[filterType]?.includes(item) || false}
                                onChange={() => handleCheckboxChange(filterType, item)}
                                className="mr-2"
                            />
                            <label>{item}</label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2">
                        Cancel
                    </button>
                    <button onClick={handleApply} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
