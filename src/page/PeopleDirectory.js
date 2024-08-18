import React, { useMemo, useState, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { faker } from '@faker-js/faker';
import { FiSearch, FiEdit, FiTrash, FiFilter, FiArrowUp, FiArrowDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PersonDetail from '../components/PersonDetail';
import EditPersonForm from '../components/EditForm';
import DeleteModal from '../components/DeleteModal';
import AddMemberForm from '../components/AddNewMember';

const PeopleDirectory = () => {
  const [data, setData] = useState(() => Array.from({ length: 100 }, () => {
    const teams = faker.helpers.arrayElements(['Design', 'Marketing', 'Developer'], faker.datatype.number({ min: 1, max: 3 }));
    return {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      status: faker.helpers.arrayElement(['Active', 'Inactive']),
      role: faker.name.jobTitle(),
      email: faker.internet.email(),
      team: teams,
    };
  }));

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue();
        const statusClasses = status === 'Active'
          ? 'bg-[#E4E7EC] text-[#6941C6]'
          : 'bg-red-500 text-white';
        return <span className={`px-3 py-1 rounded-full ${statusClasses}`}>{status}</span>;
      },
      enableSorting: true,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      enableSorting: true,
    },
    {
      accessorKey: 'email',
      header: 'Email Address',
      enableSorting: true,
    },
    {
      accessorKey: 'team',
      header: 'Teams',
      cell: ({ getValue }) => {
        const teams = getValue();
        const visibleTeams = teams.slice(0, 2);
        const extraTeamsCount = teams.length - visibleTeams.length;
        return (
          <div className="flex space-x-2 items-center">
            {visibleTeams.map((team, index) => {
              const bgColor = team === 'Design'
                ? 'bg-[#E9D7FE] text-[#6941C6]'
                : team === 'Marketing'
                ? 'bg-[#B2DDFF] text-[#175CD3]'
                : 'bg-purple-500'; // Developer
              return (
                <span key={index} className={`text-white px-2 py-1 rounded-full ${bgColor}`}>
                  {team}
                </span>
              );
            })}
            {extraTeamsCount > 0 && (
              <span className="bg-[#F9FAFB] text-[#344054] px-2 py-1 rounded-full">
                {`+${extraTeamsCount}`}
              </span>
            )}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click from firing
              handleEdit(row.original);
            }} 
            className="text-blue-500 hover:text-blue-700"
          >
            <FiEdit />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click from firing
              handleDelete(row.original.id);
            }} 
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash />
          </button>
        </div>
      ),
    },
  ], []);

  const handleSave = (updatedPerson) => {
    setData((prevData) =>
      prevData.map((person) => (person.id === updatedPerson.id ? updatedPerson : person))
    );
    setEditPerson(null); 
  };

  const handleAdd = (newPerson) => {
    setData((prevData) => [...prevData, newPerson]);
    console.log('New member data:', newPerson); // Log the new member's data
    setAddMemberVisible(false); // Close the add member form
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [editPerson, setEditPerson] = useState(null);
  const [deletePersonId, setDeletePersonId] = useState(null); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddMemberVisible, setAddMemberVisible] = useState(false); // New state for AddMemberForm visibility

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Initialize table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  // Handle editing a person
  const handleEdit = useCallback((person) => {
    setEditPerson(person); // Set the person to be edited
  }, []);

  // Handle deleting a person
  const handleDelete = useCallback((id) => {
    setDeletePersonId(id);
    setIsDeleteModalOpen(true); // Open delete modal
  }, []);

  const confirmDelete = useCallback(() => {
    setData(prevData => {
      const newData = prevData.filter(person => person.id !== deletePersonId);
      return newData;
    });
    setDeletePersonId(null);
    setIsDeleteModalOpen(false); // Close delete modal
  }, [deletePersonId]);

  // Handle row click to show person details
  const handleRowClick = useCallback((person) => {
    setSelectedPerson(person); // Set the person for details view
  }, []);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    return table.getRowModel().rows.filter(row =>
      Object.values(row.original).some(value =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, table, data]);

  // Calculate paginated data
  const paginatedData = useMemo(() => 
    filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [filteredData, currentPage, itemsPerPage]
  );

  // Get sorting icon based on column sort direction
  const getSortingIcon = useCallback((columnId) => {
    const sortDirection = sorting.find(sort => sort.id === columnId)?.desc ? 'desc' : 'asc';
    return sortDirection === 'asc' ? <FiArrowUp /> : <FiArrowDown />;
  }, [sorting]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4 sm:mb-0">Team Member ({filteredData.length} users)</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-5 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative p-2">
            <FiFilter className="" />
          </div>
          <button
            onClick={() => setAddMemberVisible(true)} // Open the add member form
            className="bg-[#6941C6] text-white px-4 py-2 rounded-md"
          >
            + Add Member
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {table.getHeaderGroups().map(headerGroup => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-4 py-2 border-b bg-gray-100 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                      onClick={() => {
                        const isDescending = sorting.find(sort => sort.id === header.id)?.desc;
                        setSorting([{ id: header.id, desc: !isDescending }]);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && getSortingIcon(header.id)}
                      </div>
                    </th>
                  ))}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-b text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} 
          disabled={currentPage === 0}
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md flex items-center"
        >
          <FiChevronLeft className="mr-2" />
          Previous
        </button>

        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`px-3 py-1 rounded-md ${index === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} 
          disabled={currentPage >= totalPages - 1}
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md flex items-center"
        >
          Next
          <FiChevronRight className="ml-2" />
        </button>
      </div>

      {selectedPerson && (
        <PersonDetail
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}

      {editPerson && (
        <EditPersonForm
          person={editPerson}
          onClose={() => setEditPerson(null)}
          onSave={handleSave}
        />
      )}

      {isAddMemberVisible && (
        <AddMemberForm
          onClose={() => setAddMemberVisible(false)}
          onSave={handleAdd} // Pass handleAdd to AddMemberForm
        />
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </div>
  );
}

export default PeopleDirectory;
