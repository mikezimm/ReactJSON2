
import * as React from 'react';
import { useState, useEffect, useCallback, } from 'react';
import { ISiteUserInfo } from '@mikezimm/fps-core-v7/lib/types/@pnp/@2.14.0/sp/site-users';

import './fps-People-Picker.css'; // Import the CSS file for styling
import { IFpsSpHttpServiceMIN } from '@mikezimm/fps-core-v7/lib/components/molecules/SpHttp/Sp/IFpsSpHttpServiceMIN';
import { CurrentSiteAbsolute, } from '@mikezimm/fps-core-v7/lib/components/molecules/source-props/WindowLocationConstants';
require('./fps-People-Picker.css');

// Define the pre-filter rule types
export type ISharePointUserPreFilterRule = 'User' | 'UserWithEmail' | 'All';

// Define the interface for the props
export interface IFpsPeoplePickerProps {
  key: string;
  label?: string;
  description?: string | JSX.Element;
  fpsSpService: IFpsSpHttpServiceMIN;
  siteUrl?: string; // Optional SharePoint site URL
  onUsersFetched?: (users: ISiteUserInfo[]) => void; // Optional callback to pass users back to parent
  sendSelectedUsers?: (users: ISiteUserInfo[]) => void; // Optional callback to pass users back to parent
  initialData?: ISiteUserInfo[]; // Add this line
  multiSelect?: boolean; // New optional property for enabling multi-select (default is true)
  disabled?: boolean;
  preFilter: ISharePointUserPreFilterRule; // Pre-filter rule for fetching users
  size?: 'S' | 'M' | 'L'; // Optional size for user images

  typeToShow?: boolean; // if true, does not show any names until the user types a search
  debounceDelay?: number; // Optional debounce delay with default value of 200ms

  styles?: React.CSSProperties;
  className?: string; // Optional class names
  labelStyles?: React.CSSProperties;
}

const FpsPeoplePicker: React.FC<IFpsPeoplePickerProps> = ({
  key, label, description, labelStyles, className,
  onUsersFetched,
  sendSelectedUsers,
  debounceDelay = 200, // Default value for debounceDelay
  siteUrl = CurrentSiteAbsolute, // Default site URL
  size = 'L',
  preFilter = 'UserWithEmail',
  initialData = [],
  typeToShow = false,
  multiSelect = true, // Default to true for multi-select functionality
  disabled = false,
}) => {
  // States for managing user search, list of users, and selected users
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<ISiteUserInfo[]>([]);
  const [allUsers, setAllUsers] = useState<ISiteUserInfo[]>([]); // Store all users
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchingMessage, setFetchingMessage] = useState<string>(''); // Message for loading state
  const [selectedUsers, setSelectedUsers] = useState<ISiteUserInfo[]>(initialData || []); // Selected users for multi-select

  // Function to send selected users back to the parent
  // const sendSelectedUsers = useCallback(() => {
  //   if (onUsersFetched) {
  //     sendSelectedUsers(selectedUsers); // Send only selected users to the parent
  //   }
  // }, [sendSelectedUsers, selectedUsers]);

  // Fetch all users from SharePoint
  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    setFetchingMessage("Fetching site users...");

    try {
      const response = await fetch(`${siteUrl}/_api/web/siteusers`, {
        headers: {
          Accept: "application/json;odata=verbose",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      let results = data.d.results.map((user: any) => ({
        ...user,
        imageUrl: `${window.location.origin}/_layouts/15/userphoto.aspx?size=${size}&accountname=${user.Email ? user.Email : user.AccountName}`,
      }));

      // Apply pre-filter for users with email
      if (preFilter === 'UserWithEmail') {
        results = results.filter((user: ISiteUserInfo) => (user.PrincipalType === 1 || user.PrincipalType === 2) && !!user.Email);
      }

      setAllUsers(results); // Save all users to state
      setUsers(results); // Initialize user list

      // Call the parent callback, if provided, to pass the users up
      if (onUsersFetched) {
        onUsersFetched(results); // This still sends all users initially
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); // Reset users on error
    } finally {
      setLoading(false);
      setFetchingMessage(''); // Hide the fetching message once loading is done
    }
  }, [siteUrl, size, onUsersFetched, preFilter]);

  // Debounced logic to filter users based on search term
  useEffect(() => {
    if (!searchTerm) {
      setUsers(allUsers); // Show all users when search term is cleared
      return;
    }

    const handler = setTimeout(() => {
      // Filter users based on search term
      const filteredUsers = allUsers.filter(user =>
        user.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.Email && user.Email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setUsers(filteredUsers);
    }, debounceDelay);

    return () => clearTimeout(handler); // Cleanup on searchTerm change
  }, [searchTerm, allUsers, debounceDelay]);

  // Trigger the fetch of users when the input is focused
  const handleFocus = async (): Promise<void> => {
    if (allUsers.length === 0) {
      await fetchAllUsers(); // Fetch all users if not already fetched
    }
  };

  // Handle checkbox change for multi-select functionality
  const handleCheckboxChange = (user: ISiteUserInfo): void => {
    if (multiSelect) {
      // Add or remove user from selected list
      setSelectedUsers((prev) => {
        if (prev.some((u) => u.Id === user.Id)) {
          return prev.filter((u) => u.Id !== user.Id);
        }
        return [...prev, user]; // Add user to selected list
      });
    } else {
      setSelectedUsers([user]); // Only allow single selection
    }
  };

  // Remove a selected user from the list
  const removeSelectedUser = (userId: number): void => {
    setSelectedUsers((prev) => prev.filter((user) => user.Id !== userId));
  };

  // Only send selected users when there is a change
  useEffect(() => {
    if ( sendSelectedUsers ) sendSelectedUsers(selectedUsers); // Send selected users whenever they change
  }, [selectedUsers]);

  return (
    <div className={ `fps-people-picker ${className}`}>
      { !label ? undefined :
      <label className='fps-people-picker-label' style={labelStyles}>
        {`${label}`}
      </label> }
      {/* Display selected users */}
      <div className="selected-users">
        {selectedUsers.map((user) => (
          <span key={user.Id} className="selected-user">
            <img src={user.imageUrl} alt={user.Title} className="user-image" />
            {user.Title}
            <button
              className="remove-user-btn"
              onClick={() => removeSelectedUser(user.Id)}
              disabled={disabled} // Disable the remove button
              style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }} // Optional styling for disabled state
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* Search input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleFocus} // Trigger fetch on focus
        placeholder="Search for a user..."
        className="search-input"
        disabled={disabled} // Disable the search input
        style={{ opacity: disabled ? 0.5 : 1 }} // Optional styling for disabled state
      />
      {loading && <p>{fetchingMessage}</p>} {/* Show loading message when fetching */}

      {/* User list */}
      <ul className="user-list"
        style={{
        opacity: disabled ? 0.7 : 1, // Reduce opacity when disabled
        pointerEvents: disabled ? 'none' : 'auto', // Prevent interactions when disabled
      }}>
        {/* Display no users found message if there are no results */}
        {loading ? (
          <p>Fetching user list...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          !fetchingMessage &&
          (typeToShow === true && !searchTerm ? (
            <p>Type a name to search {users.length} users</p>
          ) : (
            users.map((user) => (
              <li key={user.Id} className="user-item">
                <input
                  type="checkbox"
                  checked={selectedUsers.some((u) => u.Id === user.Id)} // Check if user is selected
                  onChange={() => handleCheckboxChange(user)} // Handle checkbox change
                  className="user-checkbox"
                />
                <img src={user.imageUrl} alt={user.Title} className="user-image" />
                {user.Title} - {user.Email}
              </li>
            ))
          ))
        )}
      </ul>
      {/* Description section */}
      {description && <div className="fps-people-picker-description">{description}</div>}
    </div>
  );
};

export default FpsPeoplePicker;
