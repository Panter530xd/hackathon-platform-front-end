import React, { ReactNode, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Trash, Edit, DotsVertical } from "tabler-icons-react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "../../layouts/Dashboard";
import Head from "next/head";
import useERegistrationData from "@/utils/useRegistrationData";
import { env } from "../../env.mjs";
import {
  CancelButton,
  EditButton,
  DeleteButton,
} from "../../components/ui/Button";
import axios from "axios";

interface Team {
  id: number;
  first_name: string;
  last_name: string;
  academy: string;
}

interface AlertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  onEdit: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  setIsOpen,
  onDelete,
  onEdit,
}) => {
  const handleConfirm = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <Transition.Root show={isOpen} as="div">
      <div className="fixed inset-0 z-20 bg-black/50"></div>
      <Transition.Child
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="div"
      >
        <div className="fixed z-50 w-[95vw] max-w-md rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white dark:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Are you absolutely sure?
          </h2>
          <p className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <CancelButton onClick={() => setIsOpen(false)}>Cancel</CancelButton>
            <EditButton onClick={onEdit}>
              <Edit />
            </EditButton>
            <DeleteButton onClick={handleConfirm}>
              <Trash />
            </DeleteButton>
          </div>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
};

const DashboardCreate: NextPageWithLayout = () => {
  const { registrationData, isError, isLoading } = useERegistrationData();
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [teams, setTeams] = useState<Team[][]>([]);

  // New state variables for the edit form
  const [editedTeam, setEditedTeam] = useState<Team | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }

  useEffect(() => {
    if (registrationData && registrationData.length > 0) {
      // Check if registrationData is defined and not empty
      const shuffledData = shuffleArray(registrationData); // Shuffle the array randomly
      const numTables = Math.ceil(shuffledData.length / 10);
      const generatedTeams: Team[][] = [];

      for (let i = 0; i < numTables; i++) {
        const startIndex = i * 10;
        const endIndex = startIndex + 10;
        const teamsForTable = shuffledData.slice(startIndex, endIndex);
        generatedTeams.push(teamsForTable);
      }

      // Check if the last table has fewer than 10 teams
      const lastTable = generatedTeams[generatedTeams.length - 1];
      if (lastTable.length < 10) {
        const remainingTeams = generatedTeams.splice(-1)[0];
        generatedTeams[generatedTeams.length - 1].push(...remainingTeams);
      }

      setTeams(generatedTeams);
    }
  }, [registrationData]);

  const handleDeleteTeam = async (teamId: number) => {
    try {
      const response = await axios.delete(
        `${env.NEXT_PUBLIC_API_URL}/api/registration`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: { teamId },
        }
      );

      if (response.status === 200) {
        const updatedTeams = teams.map((table) =>
          table.filter((team) => team.id !== teamId)
        );
        setTeams(updatedTeams);
        console.log(`Deleting team with ID: ${teamId}`);
      } else {
        console.log("Failed to delete team");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTeam = (teamId: number) => {
    // Find the team with the given ID
    const teamToEdit = teams.flat().find((team) => team.id === teamId);

    if (teamToEdit) {
      setEditedTeam(teamToEdit);
      setIsEditFormOpen(true);
    }
  };

  const handleEditFormSubmit = async () => {
    try {
      // Send the updated team data to the server
      const response = await axios.put(
        `${env.NEXT_PUBLIC_API_URL}/api/registration/${editedTeam?.id}`,
        editedTeam
      );

      if (response.status === 200) {
        // Update the team in the state with the updated data
        const updatedTeams = teams.map((table) =>
          table.map((team) => (team.id === editedTeam?.id ? editedTeam : team))
        );
        setTeams(updatedTeams);
        setIsEditFormOpen(false);
        setEditedTeam(null);
        console.log(`Updating team with ID: ${editedTeam?.id}`);
      } else {
        console.log("Failed to update team");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditFormCancel = () => {
    setIsEditFormOpen(false);
    setEditedTeam(null);
  };

  const togglePopUp = (teamId: number) => {
    setShowPopUp((prevState) => {
      if (prevState && selectedTeamId === teamId) {
        // Close the dialog if it's already open and the same team is clicked again
        return false;
      } else {
        setSelectedTeamId(teamId);
        return true;
      }
    });
  };

  return (
    <>
      <Head>
        <title>Dashboard - Teams</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-10">
        {teams.map((teamTable, tableIndex) => (
          <div
            key={tableIndex}
            className="grid md:grid-cols-2 grid-cols-1 gap-4 md:w-7/12 w-11/12 max-w-screen-xl mx-auto pt-10"
          >
            {teamTable.map((team) => (
              <div
                key={team.id}
                className="p-4 bg-white rounded-md shadow-md flex items-center justify-between border border-black"
              >
                <div className="flex items-center space-x-5">
                  <div>{team.first_name}</div>
                  <div>{team.last_name}</div>
                  <div>{team.academy}</div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => togglePopUp(team.id)}>
                    <DotsVertical className="w-5 h-5 text-gray-500 hover:text-gray-900" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
        {selectedTeamId !== null && !isEditFormOpen && (
          <AlertDialog
            isOpen={showPopUp}
            setIsOpen={setShowPopUp}
            onDelete={() => handleDeleteTeam(selectedTeamId)}
            onEdit={() => handleEditTeam(selectedTeamId)}
          />
        )}

        {/* Edit Form */}
        {isEditFormOpen && editedTeam && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-4 md:w-full max-w-md">
              <h2 className="text-lg font-medium text-gray-900">Edit Team</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditFormSubmit();
                }}
              >
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:outline-none sm:text-sm"
                      value={editedTeam.first_name}
                      onChange={(e) =>
                        setEditedTeam({
                          ...editedTeam,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:outline-none sm:text-sm"
                      value={editedTeam.last_name}
                      onChange={(e) =>
                        setEditedTeam({
                          ...editedTeam,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="academy"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Academy
                    </label>
                    <input
                      type="text"
                      id="academy"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:outline-none sm:text-sm"
                      value={editedTeam.academy}
                      onChange={(e) =>
                        setEditedTeam({
                          ...editedTeam,
                          academy: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <CancelButton onClick={handleEditFormCancel}>
                    Cancel
                  </CancelButton>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

DashboardCreate.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardCreate;
