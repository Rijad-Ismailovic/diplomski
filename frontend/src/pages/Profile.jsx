import React, { useEffect, useState } from "react";
import { getUser } from "../services/UserService";
import NavbarComponent from "../components/NavbarComponent";
import ProfileHeader from "../components/ProfileHeader";
import { getTicketsByUserUsername } from "../services/TicketService";
import ActiveTickets from "../components/ActiveTickets";
import FinishedTickets from "../components/FinishedTickets";

const Profile = () => {
  const [user, setUser] = useState();
  const [tickets, setTickets] = useState();

  useEffect(() => {
    getUser().then((res) => {
      setUser(res.data);
      getTicketsByUserUsername(res.data.username).then((res) =>
        setTickets(res.data)
      );
    });
  }, []);

  return (
    <div>
      <NavbarComponent />
      <ProfileHeader user={user} setUser={setUser} />
      {tickets && (
        <>
          <ActiveTickets data={tickets} user={user} setTickets={setTickets} />
          <FinishedTickets data={tickets} />
        </>
      )}
    </div>
  );
};

export default Profile;
