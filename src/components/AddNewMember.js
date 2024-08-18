import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { faker } from '@faker-js/faker';
import { FiX } from 'react-icons/fi';

// Define validation schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  status: z.enum(['Active', 'Inactive']),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email address'),
  team: z.array(z.string()).min(1, 'At least one team is required'),
});

// Define teams options
const teamsOptions = ['Marketing', 'Product', 'Design', 'Sales'];

function AddMemberForm({ onClose, onSave }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: '',
      status: 'Active',
      role: '',
      email: '',
      team: [],
    },
    resolver: zodResolver(schema),
  });

  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleTeamRemove = (teamToRemove) => {
    const updatedTeams = selectedTeams.filter((team) => team !== teamToRemove);
    setSelectedTeams(updatedTeams);
    setValue('team', updatedTeams);
  };

  const handleTeamAdd = (event) => {
    const selectedTeam = event.target.value;
    if (selectedTeam && !selectedTeams.includes(selectedTeam)) {
      const updatedTeams = [...selectedTeams, selectedTeam];
      setSelectedTeams(updatedTeams);
      setValue('team', updatedTeams);
    }
  };

  const onSubmit = (data) => {
    // Generate fake data for the new member
    const newMember = {
      ...data,
      avatar: faker.image.avatar(), // Generate a new fake avatar URL
      name: faker.name.firstName(), // Generate a new fake first name
      role: faker.name.jobTitle(), // Generate a new fake job title
      email: faker.internet.email(), // Generate a new fake email
    };

    console.log('New member data:', newMember);
    onSave(newMember); // Pass the new data back to the parent component
    console.log(data,"data after adding new memver")
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Add Member</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input {...register('name')} className="border rounded-md p-2 w-full" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email Address</label>
              <input {...register('email')} className="border rounded-md p-2 w-full" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Role</label>
              <input {...register('role')} className="border rounded-md p-2 w-full" />
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select {...register('status')} className="border rounded-md p-2 w-full">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Teams</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTeams.map((team) => (
                <div key={team} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                  {team}
                  <button
                    type="button"
                    onClick={() => handleTeamRemove(team)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
            <select
              onChange={handleTeamAdd}
              className="border rounded-md p-2 w-full"
            >
              <option value="">Add a team</option>
              {teamsOptions.map((team) => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
            {errors.team && <p className="text-red-500 text-sm">{errors.team.message}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" className="bg-gray-200 text-white px-4 py-2 rounded-md">Add Member</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMemberForm;
